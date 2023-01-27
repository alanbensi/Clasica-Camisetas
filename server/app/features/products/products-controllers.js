const sequelize = require("../../config/db_config");

//  Create product

exports.addProduct = (req, res) => {
    const { name, images, discount, price, price_usd, stock, collection, description } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!name || !price || !price_usd || !discount || !stock) {
        res.status(400);
        res.json({ error: 'Faltan campos obligatorios.' })
        return;
    }
    //searches product by the product name sent in the request
    sequelize.query('SELECT name FROM products WHERE name = ?',
        {replacements: [name], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks for the content of response
        //if response is not empty means a product by the product name is already saved
        if (response.length != 0) { 
            throw new Error (`El producto ${name} ya existe.`) 
        }
        //creates the product in db with the values sent in the body of the request
        sequelize.query('INSERT INTO products (name, images, discount, price, price_usd, stock, collection, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: [name, images, discount, price, price_usd, stock, collection, description]})
        .then((response) => {
            res.status(201).json({ 
                message: `Producto ${name} creado exitosamente.`,
                product: {
                    id: response[0],
                    name: name,
                    images: images,
                    discount: discount,
                    price: price,
                    price_usd: price_usd,
                    stock: stock,
                    collection: collection,
                    description: description
                }
            });
        });
    }).catch (function (err) {
        res.status(409).json({ error: err.message });
    });
}

//  Get all products

exports.getAll = (req, res) => {
    sequelize.query('SELECT * FROM products WHERE stock > ?',
        { replacements: [0], type: sequelize.QueryTypes.SELECT }
    ).then((response) => {
        res.status(200).json(response);
    });
}

//  Get product by id

exports.getById = (req, res) => {
    //extracts id param from req
    let id = req.params.id;
    //search by the id sent in the request
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if the product by id sent in the request exists
        if (response.length == 0) { 
            throw new Error (`El producto con Id ${id} no pudo ser encontrado.`);
        }
        //when the product exists answers the one that was found
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
};

// Get products by collection

exports.getByCollection = (req, res) => {
    //extracts collection param from req
    let collection = req.params.collection;
    //search by the collection sent in the request
    sequelize.query('SELECT * FROM products WHERE collection = ? AND stock > ?',
        {replacements: [collection, 0], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if there are any product by collection sent in req
        if (response.length == 0) { 
            throw new Error (`Productos de la colección ${collection} no pudieron ser encontrados.`);
        }
        //when products by collection exist, returns the found ones
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
};

// Get products with discount

exports.getWithDiscount = (req, res) => {
    //search products with any discount
    sequelize.query('SELECT * FROM products WHERE discount > ? AND stock > ?',
        {replacements: [0, 0], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        //checks if there are any product with discount
        if (response.length === 0) { 
            throw new Error (`No se encontraron productos con descuento.`);
        }
        //when products with discount exist, returns the found ones
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
}

//  Edit product

exports.editProduct = (req, res) => {
    let id = req.params.id;
    const { name, images, discount, price, price_usd, stock, collection, description } = req.body;
    if (!name || !images || !price || !price_usd || !discount || !stock || !collection || !description){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: 'Faltan valores requeridos.'});
        return;
    }
    // checks the existence of the product by the id sent
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the product doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`El producto con Id ${id} no pudo ser encontrado.`);
        }
        // checks the existence of a product by the product name sent
        sequelize.query('SELECT * FROM products WHERE name = ?',
            {replacements: [name], type: sequelize.QueryTypes.SELECT, raw: true }
        ).then((response) =>{
            // if product name exists in other product, returns error
            if (response.length && response[0].id != id){
                res.status(409);
                throw new Error (`Un producto con ese nombre ya existe.`);
            }
            // when the product by id is found and the product name is not in other product, makes the edition
            sequelize.query(
                `UPDATE products 
                SET name = "${name}", images = "${images}", discount = "${discount}", price = "${price}", price_usd = "${price_usd}", stock = "${stock}", collection = "${collection}", description = "${description}" 
                WHERE id = ?`, 
                {replacements: [id]}
            ).then((response) => {
                res.status(200).send('Producto editado exitosamente.')
            });
        }).catch(function(err){
            res.json({error: err.message});
        });
    }).catch(function(err){
        res.json({error: err.message});
    })
}

//  Delete product

exports.deleteProduct = (req, res) => {
    let id = req.params.id;
    // checks if the product by id exists
    sequelize.query('SELECT * FROM products WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the product by id doesn´t exist, throws an error
        if (response.length == 0){
            res.status(404)
            throw new Error (`El producto con Id ${id} no pudo ser encontrado.`);
        }
        // when the product by id exits, gets deleted
        sequelize.query('DELETE FROM products WHERE id = ?',
            {replacements: [id]}
        ).then((response) => {
            res.status(204).json();
        });
    }).catch(function(err){
        res.json({error: err.message});
    });
};