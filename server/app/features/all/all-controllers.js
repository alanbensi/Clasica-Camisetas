const sequelize = require("../../config/db_config");

// Get ALL User info, Orders and Auctions by User Id

exports.getAllByUserId = (req, res) => {
    const { id, admin } = req.tokenData;
    const { userId } = req.body;
    const idToUse = admin === 1 && userId ? userId : id;
    // searches user by id and active status
    sequelize.query(`SELECT * FROM users WHERE id = ? AND status = ?`,
        {replacements: [idToUse, true], type: sequelize.QueryTypes.SELECT, raw: true}
    ).then(([response]) => {
        let userInfo = {};
        if (response) {
            // when user exists, sends response
            const { id, username, name, surname, fullname, email, phone, created_at } = response;
            userInfo = {
                user: {
                    id,
                    username,
                    name,
                    surname,
                    fullname,
                    email,
                    phone,
                    created_at
                }
            }
            // searches bids by user id and auctions info
            sequelize.query(`SELECT bids.*, bids.created_at AS bid_created_at, auctions.* 
                FROM bids 
                JOIN auctions ON bids.auction_id = auctions.id
                WHERE user_id = ? ORDER BY bids.created_at DESC`,
                {replacements: [idToUse], type: sequelize.QueryTypes.SELECT, raw: true}
            ).then((response) => {
                userInfo = {
                    ...userInfo,
                    auctionsBids: response
                }
                // searches orders by user id
                sequelize.query('SELECT * FROM orders WHERE user_id = ?',
                    {replacements: [idToUse], type: sequelize.QueryTypes.SELECT, raw: true}
                ).then(async function(response) {
                    try {
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
                        userInfo = {
                            ...userInfo,
                            orders: ordersWithItems,
                        }
                        res.status(200).send(userInfo);
                    } catch (err) {
                        res.json({ error: err.message });
                    }
                })
            })
        } else {
            // when the user is not found, throws error
            throw new Error (`Usuario con Id ${idToUse} no pudo ser encontrado.`);
        }
    }).catch(function (err){
        res.status(404).json({ error: err.message });
    });
};