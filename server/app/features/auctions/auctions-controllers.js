const sequelize = require("../../config/db_config");
const { auctionsStatus } = require("./auctions-model");

// AUCTIONS

exports.addAuction = (req, res) => {
    const { name, images, auction_status, open_value, start_date, end_date, description } = req.body;
    // checks if there´s a missing value, returns an error if there is
    if (!name || !open_value || !start_date || !end_date) {
        res.status(400);
        res.json({ error: 'Faltan campos obligatorios.' })
        return;
    }
    //creates the auction with the values sent in the body of the request
    sequelize.query('INSERT INTO auctions (name, images, auction_status, open_value, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        {replacements: [name, images, auction_status, open_value, start_date, end_date, description]})
    .then(() => {
        res.status(201).json({ 
            message: `Subasta ${name} creada exitosamente.`,
        });
    }).catch (function (err) {
        res.json({ error: err.message });
    });
}

exports.getAll = (req, res) => {
    sequelize.query('SELECT * FROM auctions',
        { replacements: [0], type: sequelize.QueryTypes.SELECT }
    ).then(async function(response) {
        try {
            if (response.length === 0){
                res.status(404)
                throw new Error (`No se ha encontrado ninguna subasta.`);
            }
            const auctionsWithBid = [];
            await Promise.all(response.map(async function(auction){
                await sequelize.query(`SELECT * FROM bids WHERE auction_id = ? ORDER BY created_at DESC LIMIT 1`,
                    {replacements: [auction.id], type: sequelize.QueryTypes.SELECT, raw: true }
                ).then(([res]) => {
                    auctionsWithBid.push({
                        ...auction,
                        last_bid: res
                    });
                })
            }))
            res.status(200).json(auctionsWithBid);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    });
}

exports.getActiveAuctions = (req, res) => {
    sequelize.query('SELECT * FROM auctions WHERE auction_status = ?',
        { replacements: [auctionsStatus.active], type: sequelize.QueryTypes.SELECT }
    ).then(async function(response) {
        try {
            if (response.length === 0){
                res.status(404)
                throw new Error (`No se ha encontrado ninguna subasta.`);
            }
            const auctionsWithBid = [];
            await Promise.all(response.map(async function(auction){
                await sequelize.query(`SELECT * FROM bids WHERE auction_id = ? ORDER BY created_at DESC LIMIT 1`,
                    {replacements: [auction.id], type: sequelize.QueryTypes.SELECT, raw: true }
                ).then(([res]) => {
                    auctionsWithBid.push({
                        ...auction,
                        last_bid: res
                    });
                })
            }))
            res.status(200).json(auctionsWithBid);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    });
}

exports.getClosedAuctions = (req, res) => {
    sequelize.query('SELECT * FROM auctions WHERE auction_status = ?',
        { replacements: [auctionsStatus.closed], type: sequelize.QueryTypes.SELECT }
    ).then(async function(response) {
        try {
            if (response.length === 0){
                res.status(404)
                throw new Error (`No se ha encontrado ninguna subasta.`);
            }
            const auctionsWithBid = [];
            await Promise.all(response.map(async function(auction){
                await sequelize.query(`SELECT * FROM bids WHERE auction_id = ? ORDER BY created_at DESC LIMIT 1`,
                    {replacements: [auction.id], type: sequelize.QueryTypes.SELECT, raw: true }
                ).then(([res]) => {
                    auctionsWithBid.push({
                        ...auction,
                        last_bid: res
                    });
                })
            }))
            res.status(200).json(auctionsWithBid);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    });
}

exports.getById = (req, res) => {
    //extracts id param from req
    let id = req.params.id;
    //search by the id sent in the request
    sequelize.query('SELECT * FROM auctions WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then(([response]) => {
        //checks if the auction by id sent in the request exists
        if (response) { 
            sequelize.query(`SELECT * FROM bids WHERE auction_id = ? ORDER BY created_at DESC LIMIT 1`,
                {replacements: [response.id], type: sequelize.QueryTypes.SELECT, raw: true }
            ).then(([result]) => {
                response.last_bid = result;
                //when the auction exists answers the one that was found
                res.status(200).json(response);
            })
        } else {
            throw new Error (`La subasta con Id ${id} no pudo ser encontrada.`);
        }
    }).catch (function (err) {
        res.status(404).json({ error: err.message });
    });
};

exports.editAuction = (req, res) => {
    let id = req.params.id;
    const { name, images, auction_status, open_value, start_date, end_date, description } = req.body;
    if (!name || !images || !auction_status || !open_value || !start_date || !end_date || !description){
        // if nothing was sent in the body of the request, returns an error
        res.status(400).json({error: 'Faltan valores requeridos.'});
        return;
    }
    // checks the existence of the auction by the id sent
    sequelize.query('SELECT * FROM auctions WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        // if the auction doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`La subasta con Id ${id} no pudo ser encontrada.`);
        }
            // when the auction by id is found makes the edition
            sequelize.query(
                `UPDATE auctions 
                SET name = "${name}", images = "${images}", auction_status = "${auction_status}", open_value = "${open_value}", start_date = "${start_date}", end_date = "${end_date}", description = "${description}" 
                WHERE id = ?`, 
                {replacements: [id]}
            ).then(() => {
                res.status(200).send('Subasta editada exitosamente.');
            });
        
    }).catch(function(err){
        res.json({error: err.message});
    })
}

exports.closeAuction = (req, res) => {
    let id = req.params.id;
    // checks the existence of the auction by the id sent
    sequelize.query('SELECT * FROM auctions WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) => {
        // if the auction doesn´t exists, returns an error
        if (response.length == 0){
            res.status(404);
            throw new Error (`La subasta con Id ${id} no pudo ser encontrada.`);
        }
            // when the auction by id is found makes the edition
            sequelize.query(
                `UPDATE auctions 
                SET auction_status = "${auctionsStatus.closed}" 
                WHERE id = ?`, 
                {replacements: [id]}
            ).then(() => {
                res.status(200).send('Subasta cerrada exitosamente.')
            });
        
    }).catch(function(err){
        res.json({error: err.message});
    })
}

exports.deleteAuction = (req, res) => {
    let id = req.params.id;
    // checks if the auction by id exists
    sequelize.query('SELECT * FROM auctions WHERE id = ?',
        {replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
    ).then((response) =>{
        // if the auction by id doesn´t exist, throws an error
        if (response.length == 0){
            res.status(404)
            throw new Error (`La subasta con Id ${id} no pudo ser encontrada.`);
        }
        // when the auction by id exits, gets deleted
        sequelize.query('DELETE FROM auctions WHERE id = ?',
            {replacements: [id]}
        ).then((response) => {
            res.status(204).json();
        });
    }).catch(function(err){
        res.json({error: err.message});
    });
};
