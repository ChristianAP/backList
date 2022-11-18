require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json('No Autorizado');

    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const content = jwt.verify(token, process.env.TOKEN_KEY);
        req.data = content;
        next();
    } else {
        res.status(401).json('Token vacio');
    }
}

exports.jwtsingin = () => {}