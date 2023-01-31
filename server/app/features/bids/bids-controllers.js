const sequelize = require("../../config/db_config");

// BIDS

exports.addBid = (req, res) => {
    const { auction_id, user_id, bid_value, auto_bid } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!auction_id || !user_id || !bid_value || !auto_bid) {
        res.status(400).json({ error: 'Faltan campos obligatorios.' })
        return;
    }
    //creates the auction with the values sent in the body of the request
    sequelize.query('INSERT INTO bids (auction_id, user_id, bid_value, auto_bid) VALUES (?, ?, ?, ?)',
        {replacements: [auction_id, user_id, bid_value, auto_bid]})
    .then(() => {
        sequelize.query(
            `UPDATE auctions 
            SET end_date = DATE_ADD(end_date, INTERVAL 10 minute)
            WHERE id = ?`, 
            {replacements: [auction_id]}
        ).then(() => {
            res.status(201).json({ 
                message: `Oferta creada exitosamente.`,
            });
        });
    }).catch (function (err) {
        res.json({ error: err.message });
    });
}

exports.getBidsByAuctionId = (req, res) => {
    //extracts id param from req
    let auctionId = req.params.id;
    //search by the auction id sent in the request
    sequelize.query('SELECT * FROM bids WHERE auction_id = ? ORDER BY created_at DESC',
        {replacements: [auctionId], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        if (response.length === 0) {
            throw new Error (`Las ofertas para la subasta con Id ${id} no pudieron ser encontradas.`);
        }
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
};

exports.getBidsByUserId = (req, res) => {
    //extracts id param from req
    let userId = req.params.id;
    //search by the user id sent in the request
    sequelize.query('SELECT * FROM bids WHERE user_id = ? ORDER BY created_at DESC',
        {replacements: [userId], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        if (response.length === 0) {
            throw new Error (`Las ofertas del usuario con Id ${id} no pudieron ser encontradas.`);
        }
        res.status(200).json(response);
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
};

exports.editBid = (req, res) => {
    let id = req.params.id;
    const { auction_id, user_id, bid_value, auto_bid } = req.body;
    if (!auction_id || !user_id || !bid_value || !auto_bid){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: 'Faltan valores requeridos.'});
        return;
    }
    // checks the existence of the bid by the id sent
    sequelize.query('SELECT * FROM bids WHERE bid_id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        // if the bid doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`La oferta con Id ${id} no pudo ser encontrada.`);
        }
            // when the bid by id is found makes the edition
            sequelize.query(
                `UPDATE bids 
                SET auction_id = "${auction_id}", user_id = "${user_id}", bid_value = "${bid_value}", auto_bid = "${auto_bid}" 
                WHERE bid_id = ?`, 
                {replacements: [id]}
            ).then(() => {
                res.status(200).send('Oferta editada exitosamente.');
            });
        
    }).catch(function(err){
        res.json({error: err.message});
    })
}
