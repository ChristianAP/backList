const { oneDataClientePerson } = require("../../api/model/person.model");
const { onlyDate, onlyTime } = require("../globals/date.global");
const here = require("../../api/model/temporary_alerts.model");
const { decodeArray } = require("../functions/decode.array.functions");

const saleOnline = (socket) => {

    socket.on("createSaleOnline", async (newSaleOnlineData) => {

        console.log("createSaleOnline")
        let dateBack = await onlyDate();
        let hourBack = await onlyTime();
        let namesPerson = await oneDataClientePerson(newSaleOnlineData.client);

        let newSaleData = {
            TEA_INSERT_ID: newSaleOnlineData.id,
            TEA_TITLE: "Nueva Venta Relizada",
            TEA_TOTAL: "Total: s/. " + newSaleOnlineData.total,
            TEA_CLIENT: namesPerson,
            TEA_COLOR: "green.100",
            TEA_DATE: dateBack,
            TEA_HOUR: hourBack,
            TEA_TYPE: "AI",
            TEA_STATUS: "0",
        };

        let idSale = await here.createFromServer(newSaleData);

        newSaleOnlineData.date = dateBack;
        newSaleOnlineData.client = namesPerson;
        newSaleOnlineData.idalert = idSale;

        socket.broadcast.emit("newSaleOnline", newSaleOnlineData);

        let client_description = `FROM TO FRONT: 
        Cliente: ${newSaleOnlineData.client}, 
        orderId: ${newSaleOnlineData.orderId}, 
        order: ${await decodeArray(newSaleOnlineData.order)}, 
        orderdetails: ${decodeArray(newSaleOnlineData.orderdetails)}`;

        // TO DO
        console.log(client_description)

        newSaleData.TEA_CLIENT_DESCRIPTION = client_description;

    });

};


module.exports = saleOnline