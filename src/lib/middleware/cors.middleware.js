require('dotenv').config();

exports.corsMiddleware = (req, res, next) => {
    var allowlist = [process.env.URI_FRONT_CORS, 'http://localhost:5000']

    if (!req.header('Origin')) {
        res.redirect('https://cudesi.com.pe/facturacion-electronica/');
    }
    else if (allowlist.indexOf(req.header('Origin')) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', req.header('Origin'));
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );
        res.header('Access-Control-Allow-Headers',
            'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    }
    else {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader(
            'Access-Control-Allow-Methods', false
        );
        res.setHeader(
            'Access-Control-Allow-Headers', false
        );
        res.setHeader('Access-Control-Allow-Credentials', false);
        res.status(500).json(codes.resCustom500('No se encontro el dominio ' + origin, 'Dominio erroneo ' + origin));
    }

}