const request = require("request");
const moment = require("moment");
const { configMsg, app, pingBot } = require("../config/config");

const sendTelegramNoti = async (message, groupID = "-542156910") => {
    const getToken = app && app == "prod" ? pingBot.prodToken : pingBot.devToken;
    const url = `https://api.telegram.org/bot${getToken}/sendMessage?chat_id=${groupID}&text=@msg`;
    let msg = "";
    msg = `[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`;
    msg = msg.slice(0, msg.length > 300 ? 300 : msg.length);
    request.get(url.replace('@msg', encodeURIComponent(msg)));
};

module.exports = {
    sendTelegramNoti,
}
