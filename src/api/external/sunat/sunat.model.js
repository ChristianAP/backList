var axios = require('axios');

const BASE_URL = 'https://api.apis.net.pe/v1/ruc?numero=';

exports.readRUC = async(res, params) => {
    var config = {
        method: 'GET',
        url: BASE_URL + params,
    };
    axios(config)
        .then((response) => {
            let data_ruc = {
                PLATFORM: 'sunat',
                PER_TRADENAME: response.data.nombre,
                PER_RUC: response.data.numeroDocumento,
                PER_ACTIVE: response.data.estado,
                PER_CONDITION: response.data.condicion,
                PER_DEPARTMENT: response.data.departamento,
                PER_PROVINCE: response.data.provincia,
                PER_DISTRIC: response.data.distrito,
                PER_DIRECTION: response.data.direccion,
                PER_COUNTRY: 'PERU',
            }
            res.status(200).json(data_ruc);
        })
        .catch((error) => {
            res.status(error.response.status).json({ status: error.response.status, error: error.response.data })
        });
}