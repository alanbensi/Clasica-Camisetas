const { jwt, jwtKey } = require("./config/config");

// Handles server errors
exports.handleError = (err, req, res, next) => {
    if (!err) { next(); }
    res.status(500).send('An error has occurred. ' + err);
    console.log(`Error: ${err} en ${req.path} ${req.method}`)
}

// Verifies if the user is an admin
exports.adminAuth = (req, res, next) =>{
    try {
        // if the token is not sent in the header, throws an error
        if (!(req.headers.authorization)) { throw new Error ('Token no encontrado. Se necesitan permisos.') }
        // extracts the token from the header
        const token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose 
        const decodeToken = jwt.verify(token, jwtKey);
        // checks if the user is admin
        // when it is, allows the request to keep going
        if(decodeToken && decodeToken.admin === 1) { return next(); }
        else{ throw new Error ('Acceso denegado.') }
    } catch(err){
        res.status(403).json({ error: err.message });
    }
}

// Validates user session
// eslint-disable-next-line no-unused-vars
exports.validateUser = (req, res, next) => {
    try {
        // if the token is not sent in the header, throws an error
        if (!(req.headers.authorization)) { throw new Error ('Token no encontrado. Se necesitan permisos.') }
        // extracts the token from the header
        let token = req.headers.authorization.split(' ')[1];
        // verifies the token with the sign chose
        const decodeToken = jwt.verify(token, jwtKey);
        if (decodeToken) {
            // sends the data contained in the token
            req.tokenData = decodeToken;
            next();
        } else {
            throw new Error ('No ha iniciado sesión.');
        }
    } catch (err) {
        res.status(401).json({ error: err })
    }
}