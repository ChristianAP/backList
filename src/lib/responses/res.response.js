// Message
exports.code_200 = (comp, act) => {
    return comp + " ha sido " + act + " con éxito.";
};

exports.code_201 = (comp, act) => {
    return comp + " ha sido " + act + " exitosamente.";
};

exports.code_404 = (comp, act) => {
    return comp + " no " + act + " en los registros actuales.";
};

exports.code_500 = (comp, act) => {
    return "Error en la cosulta al " + act + " " + comp;
};

// RES

// [200 OK]
exports.res_code_200 = (res, comp, act) => {
    res.status(200).json({
        message: "El recurso " + comp + " ha sido " + act + " con exito",
        status: 200
    });
};

// [201 Created]
exports.res_code_201 = (res, comp, act) => {
    res.status(201).json({
        message: "Ha sido creado con exito",
    });
    // return comp + " ha sido " + act + " exitosamente.";
};

// [204 No Content]
exports.res_code_204 = (res, comp, act) => {
    res.status(204).json({
        message: "Ha sido creado con exito",
    });
    // return comp + " ha sido " + act + " exitosamente.";
};

// [401 Unauthorized]
exports.res_code_401 = (res, comp, act) => {
    res.status(401).json({
        status: 401,
        message: comp,
        action: act,
    });
};

// [403 Forbidden]
exports.res_code_403 = (res, comp, act) => {
    res.status(403).json({
        message: "Ha sido creado con exito",
    });
    // return comp + " ha sido " + act + " exitosamente.";
};

// [404 Not Found] 
exports.res_code_404 = (res, comp, act) => {
    res.status(404).json({
        message: "Ha sido creado con exito",
    });
    // return comp + " ha sido " + act + " exitosamente.";
};

// [405 Method Not Allowed]
exports.res_code_405 = (res, comp, act) => {
    res.status(405).json({
        message: "Ha sido creado con exito",
    });
    // return comp + " ha sido " + act + " exitosamente.";
};

// [500 Internal Server Error]
exports.res_code_500 = (res) => {
    res.status(500).json({
        status: 500,
        message: "Error interno de servidor"
    });
};