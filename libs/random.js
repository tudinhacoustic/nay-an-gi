const { Console } = require("console");
const fs = require("fs");
const file = "./json/quan-an.json";
const { sendTelegramNoti } = require("./sendTelegram");

const randomMsg = () => {
    const msgFailed =  "Mở File thất bại";
    fs.readFile(file, (err, data) => {
        if(err){
            console.error(err);
            sendTelegramNoti(msgFailed);
            return
        }
        const obj = JSON.parse(data);
        const count = Object.keys(obj).length;
        const random = parseInt(Math.random() * count) + 1;
        const msg = `
Nay đi ăn: ${obj[random]} 😱
`;
    sendTelegramNoti(msg);
    }) 
}

module.exports = {
    randomMsg,
}