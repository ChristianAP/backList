const { oneDataPerson, oneDataClientePerson } = require("../../api/model/person.model");
const { onlyDate, onlyTime } = require("../globals/date.global");
const here = require("../../api/model/temporary_alerts.model");

const createTicket = (socket) => {

    socket.on("createTicket", async (ticket) => {
        let dateBack = await onlyDate();
        let hourBack = await onlyTime();
        let namesPerson = await oneDataPerson(ticket.client);
        ticket.client = namesPerson;
        ticket.date = dateBack;
        ticket.hour = hourBack;

        let newTicketData = {
            TEA_INSERT_ID: ticket.id,
            TEA_TITLE: "Nuevo Ticket Creado",
            TEA_DESCRIPTION: ticket.asunto,
            TEA_CLIENT: namesPerson,
            TEA_COLOR: "yellow.100",
            TEA_DATE: dateBack,
            TEA_HOUR: hourBack,
            TEA_TYPE: "AI",
            TEA_STATUS: "0",
        };

        await here.createFromServer(newTicketData);
        socket.volatile.emit("newTicket", ticket);
    });

    socket.on("createTicketClient", async (ticket) => {
        let dateBack = await onlyDate();
        let hourBack = await onlyTime();
        let namesPerson = await oneDataClientePerson(ticket.client);

        let newTicketData = {
            TEA_INSERT_ID: ticket.id,
            TEA_TITLE: "Nuevo Ticket Creado",
            TEA_DESCRIPTION: ticket.asunto,
            TEA_CLIENT: namesPerson,
            TEA_COLOR: "yellow.100",
            TEA_DATE: dateBack,
            TEA_HOUR: hourBack,
            TEA_TYPE: "AI",
            TEA_STATUS: "0",
        };

        let idTicket = await here.createFromServer(newTicketData);

        ticket.client = namesPerson;
        ticket.date = dateBack;
        ticket.hour = hourBack;
        ticket.idalert = idTicket;
        socket.broadcast.emit("newTicket", ticket);
    });

};

module.exports = createTicket;
