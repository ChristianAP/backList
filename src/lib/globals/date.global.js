exports.onlyDate = async() => {
    const event = new Date();
    let fullYear = event.getFullYear().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullMonth = event.getMonth().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullDate = event.getDate().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let date = await (fullDate + "-" + (Number(fullMonth) + 1) + "-" + fullYear);
    return date;
};

exports.onlyTime = async() => {
    const event = new Date();
    return await event.toLocaleTimeString().toLocaleString("es-ES", { timeZone: "America/Lima" });
};

exports.dateAndHour = async() => {
    const event = new Date();
    return (
        await event.toLocaleDateString().toLocaleString("es-ES", { timeZone: "America/Lima" }) + " " + new Date().toLocaleTimeString().toLocaleString("es-ES", { timeZone: "America/Lima" })
    );
};

exports.dateForOperationsInDB = async() => {
    // YY - MM - DD
    const event = new Date();
    let fullYear = event.getFullYear().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullMonth = event.getMonth().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullDate = event.getDate().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let date = fullYear + "-" + (Number(fullMonth) + 1) + "-" + fullDate;
    return date;
};


exports.dateAndHourForOperationsInDB = async() => {
    // YY - MM - DD 00:00:00
    const event = new Date();

    let fullYear = event.getFullYear().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullMonth = event.getMonth().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullDate = event.getDate().toLocaleString("es-ES", { timeZone: "America/Lima" });
    let fullHour = event.toLocaleTimeString().toLocaleString("es-ES", { timeZone: "America/Lima" });

    let date = await (fullYear + "-" + (Number(fullMonth) + 1) + "-" + fullDate + " " + fullHour);
    return date;
};