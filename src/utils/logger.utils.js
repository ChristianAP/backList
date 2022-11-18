const express = require('express');
const router = express.Router();
const log4js = require("log4js");
const fs = require('fs')

router.get("/:user/:password", async (request, response) => {
    const { user, password } = request.params;
    try {
        if (user === 'gallinita' && password === 'logs@2022!') {
            let log = fs.readFileSync('logs/out.log', 'utf8',
                (error, content) => {
                    if (error) {
                        log4js.getLogger().error(error);
                        return error;
                    }
                    return content;
                });
            response.set("Content-Type", "text/plain");
            return response.send(log);
        }
        response.redirect('https://www.cudesi.com.pe');
    } catch (e) {
        return response.sendStatus(500);
    }
});

module.exports = router;
