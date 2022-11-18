const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.encodeMiddleware = async(req, res, next) => {
    const hash = await bcrypt.hashSync(req.body.USR_PASSWORD, saltRounds);
    req.password = await hash;
    next();
};

exports.encode = async(parameter) => {
    const hash = await bcrypt.hashSync(parameter, saltRounds);
    return hash;
};

exports.checkEncode = (parameter, pass_hash) => {
    const bool = bcrypt.compareSync(parameter, pass_hash);
    return bool;
};