var axios = require('axios');

const BASE_URL = 'https://api.apis.net.pe/v1/dni?numero=';

exports.readDNI = async (res, params) => {
    var config = {
        method: 'GET',
        url: BASE_URL + params,
    };
    axios(config)
        .then(function (response) {
            let data_person = {
                PLATFORM: 'reniec',
                PER_NAME: response.data.nombres,
                PER_LAST_FATHER: response.data.apellidoPaterno,
                PER_LAST_MOTHER: response.data.apellidoMaterno,
                PER_LASTNAME: response.data.apellidoPaterno + " " + response.data.apellidoMaterno,
                PER_DNI: response.data.numeroDocumento,
                PER_TYPE_DOCUMENT: response.data.tipoDocumento
            }
            res.status(200).json(data_person);
        })
        .catch(function (error) {
            res.status(error.response.status).json({ status: error.response.status, error: error.response.data });
        });
}