const sequelize = require("../../config/db_config");

const cancelledStatus = "Cancelado";

//  Create Order

exports.addOrder = (req, res) => {
    const { id } = req.tokenData
    const { order, order_items } = req.body;
    // checks if the user with the id sent in the order exists
    sequelize.query('SELECT id FROM users WHERE id = ? AND status = ?',
        {replacements: [id, true], type: sequelize.QueryTypes.SELECT, raw: true}
    ).then(async function (response) {
        try {
            // if there´s no user with the id sent, throws a not found error
            if (response.length == 0) {
                res.status(404)
                throw new Error (`El usuario con Id ${id} no pudo ser encontrado.`);
            }
            // when the user exists 
            await Promise.all(order_items.map(async (item, i) => {
                // gets the price, price in usd, discount and stock of every item of the products table sent in order_items
                const [itemData] = await sequelize.query('SELECT price, price_usd, discount, stock FROM products WHERE id = ?',
                { replacements: [item.product_id], type: sequelize.QueryTypes.SELECT, raw: true });
                // if any of the products by id can't be found throws an error
                if (!itemData){
                    res.status(404)
                    throw new Error (`El producto con Id ${item.product_id} no pudo ser encontrado.`);
                }
                // reduces stock by quantity ordered
                let newStock = itemData.stock - item.quantity;
                sequelize.query(`UPDATE products SET stock = "${newStock}" WHERE id = ?`, { replacements: [item.product_id] });
                // adds remaining data to order_items array
                order_items[i] = {
                    ...order_items[i],
                    price: itemData.price,
                    price_usd: itemData.price_usd,
                    discount: itemData.discount
                }
            }))
            // after the price of the whole order is obtained, creates the order
            sequelize.query('INSERT INTO orders (user_id, total, total_usd, order_status, payment, payment_status, tracking_code, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                {replacements: [id, order.total, order.totalUsd, "Nuevo", order.payment, "Pendiente", null, order.address]}
            ).then((response) => {
                // creates a register for every ordered item
                order_items.forEach(item => {
                    sequelize.query('INSERT INTO order_items (order_id, product_id, quantity, price, price_usd, discount) VALUES (?, ?, ?, ?, ?, ?)',
                    {replacements: [response[0], item.product_id, item.quantity, item.price, item.price_usd, item.discount]}); 
                });
                res.status(201).json({message: "La orden fue creada con éxito"});
            });
        } catch (err) {
            res.json({ error: err.message });
        }
    }); 
};

//  Get all orders or orders by any user id for admin or all orders for logged user id

exports.getOrders = (req, res) => {
    const { id, admin } = req.tokenData;
    const { userId } = req.body;
    // user id to search by depending on whether the logged user is an admin or not
    const idToUse = admin === 1 ? userId : id;
    // when the user logged in is an admin and an user id was not sent in body, returns all orders
    if (admin === 1 && userId == null) {
        sequelize.query('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id GROUP BY orders.id',
            {type: sequelize.QueryTypes.SELECT, raw: true}
        ).then(async function(response) {
            try {
                if (response.length === 0){
                    res.status(404)
                    throw new Error (`No se ha encontrado ningún pedido.`);
                }
                const ordersWithItems = [];
                await Promise.all(response.map(async function(order){
                    await sequelize.query(`SELECT order_items.*, products.name, products.images
                        FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
                        {replacements: [order.id], type: sequelize.QueryTypes.SELECT, raw: true }
                    ).then((res) => {
                        ordersWithItems.push({
                            ...order,
                            items: res
                        });
                    })
                }))
                res.status(200).json(ordersWithItems);
            } catch (err) {
                res.status(404).json({ error: err.message });
            }
        })
    } 
    // when the user logged in is not an admin, returns all orders made by that user
    // and when the user logged in is an admin and an user id was sent in body, returns all orders by sent id
    else {
        sequelize.query('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = ? GROUP BY orders.id',
            {replacements: [idToUse], type: sequelize.QueryTypes.SELECT, raw: true}
        ).then(async function(response) {
            try {
                if (response.length === 0){
                    res.status(404)
                    throw new Error (`El usuario no ha hecho ningún pedido.`);
                }
                const ordersWithItems = [];
                await Promise.all(response.map(async function(order){
                    await sequelize.query(`SELECT order_items.*, products.name, products.images
                        FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
                        {replacements: [order.id], type: sequelize.QueryTypes.SELECT, raw: true }
                    ).then((res) => {
                        ordersWithItems.push({
                            ...order,
                            items: res
                        });
                    })
                }))
                res.status(200).json(ordersWithItems);
            } catch (err) {
                res.status(404).json({ error: err.message });
            }
        })
    }
};

//  Get order by id

exports.getById = (req, res) => {
    const id = req.params.id;
    // searches order by the id sent in path
    sequelize.query('SELECT orders.*, users.fullname FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id  WHERE orders.id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true}
    ).then(([response]) => {
        let orderData = response;
        // if the order id can´t be found, throws error
        if(!(response.id)){
            res.status(404);
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when order exists, get order items
        sequelize.query(`SELECT order_items.*, products.name, products.images
            FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_id = ? GROUP BY order_items.id`,
            {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
        ).then((response) => {
            orderData = {
                ...orderData,
                items: response
            }
            // sends formatted response
            res.status(200).json(orderData);
        })
    }).catch(function (err){
        res.json({ error: err.message});
    });
};

// Check order stock

exports.checkStock = (req, res) => {
    const { order, order_items } = req.body;
    (async () => {
        try {
            // when the user exists 
            await Promise.all(order_items.map(async (item) => {
                // gets the price, price in usd, discount and stock of every item of the products table sent in order_items
                const [itemData] = await sequelize.query('SELECT stock FROM products WHERE id = ?',
                { replacements: [item.product_id], type: sequelize.QueryTypes.SELECT, raw: true });
                // if any of the products by id can't be found throws an error
                if (!itemData){
                    res.status(404)
                    throw new Error (`El producto con Id ${item.product_id} no pudo ser encontrado.`);
                }
                if (itemData.stock < item.quantity) {
                    res.status(409)
                    throw new Error (`No hay suficiente stock del producto con Id ${item.product_id}.`);
                } else {
                    res.status(200).json();
                }
            }));
        } catch (err) {
            res.json({ error: err.message });
        }
    })();
}

//  Edit status of the order by order id

exports.editOrder = (req, res) => {
    const id = req.params.id;
    const { order_status, payment, payment_status, tracking_code, address } = req.body;
    if (!order_status || !payment || !payment_status || !tracking_code || !address ){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: `Faltan campos obligatorios.`});
        return;
    }
    // checks the existence of the order by the id sent
    sequelize.query('SELECT * FROM orders WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the order doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when the order by id is found, makes the edition
        sequelize.query(
            `UPDATE orders 
            SET order_status = "${order_status}", payment = "${payment}", payment_status = "${payment_status}", tracking_code = "${tracking_code}", address = "${address}" 
            WHERE id = ?`, 
            {replacements: [id]}
        ).then((response) => { 
            res.status(200).send('La orden fue editada exitosamente.');
        });
    }).catch(function(err){
        res.json({error: err.message});
    })
};

// Cancel Order
// Puts order_status as cancelled and adds the stock back
exports.cancelOrder = (req, res) => {
    const id = req.params.id;
    // checks the existence of the order by the id sent
    sequelize.query('SELECT * FROM orders WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the order doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when the order by id is found, makes the edition
        sequelize.query(
            `UPDATE orders 
            SET order_status = "${cancelledStatus}"
            WHERE id = ?`, 
            {replacements: [id]}
        ).then((response) => {
            // products stock returns to original state
            sequelize.query(
                `SELECT order_items.product_id, order_items.quantity FROM order_items WHERE order_id = ?`, 
                {replacements: [id]}
            ).then(async function([response]) {
                try {
                    if (!response){
                        res.status(404)
                        throw new Error (`Los productos de la orden con Id ${id} no han podido ser encontrados.`);
                    }
                    await Promise.all(response.map(async function(orderItem){
                        await sequelize.query(
                            `UPDATE products 
                            SET stock = stock + ${orderItem.quantity} 
                            WHERE id = ?`,
                            {replacements: [orderItem.product_id]}
                        )
                    }));
                    res.status(200).send('La orden fue cancelada exitosamente.');
                } catch (err) {
                    res.status(404).json({ error: err.message });
                }
            })
        });
    }).catch(function(err){
        res.json({error: err.message});
    })
}

//  Delete order

exports.deleteOrder = (req, res) => {
    const id = req.params.id;
    // checks if the order by id exists
    sequelize.query('SELECT * FROM orders WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the order by id doesn´t exist, throws an error
        if (response.length == 0){
            res.status(404)
            throw new Error (`La orden con Id ${id} no pudo ser encontrada.`);
        }
        // when the order by id exits, gets deleted
        sequelize.query('DELETE orders, order_items FROM orders JOIN order_items ON order_items.order_id = orders.id WHERE id = ?',
            {replacements: [id]}
        ).then((response) => {
            res.status(204).json();
        });
    }).catch(function(err){
        res.json({error: err.message});
    });
};