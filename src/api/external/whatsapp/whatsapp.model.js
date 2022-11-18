var axios = require('axios');

const BASE_URL = `https://graph.facebook.com/${process.env.WSP_VERSION}/${process.env.WSP_PHONE_NUMBER_ID}/messages`;
let TOKEN = 'Bearer EAATJiHhe3KwBAPPZBCQEKEnhPezu9yWPLDUq8LXA01ZCOdtyf1tyQ1VHFn5AFR1BOSdK4NPiBPZCBTlZBkAt17JGT8Nz9LWMaZC45nYYwGSM1XT9VNdsFCOWcUXwOkgo29K8cLTJx1Q6nbWjn3DbouBR3FEkXHfAqMAebOXXeM1BR0FCa0t7WarZBTbZAU1sXOoKBsDDyvIqDMUFXcaDbMI'

exports.sendMessage = async (res, param) => {
    var data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": param,
        "recipient_type": "individual",
        "type": "template",
        "template": {
            "name": "hello_world",
            "language": {
                "code": "en_US"
            }
        },
    });

    var config = {
        method: 'post',
        url: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            res.status(200).json(response.data);
        })
        .catch(function (error) {
            res.status(400).json(error);
        });
}