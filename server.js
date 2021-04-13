const TelegramBot = require("node-telegram-bot-api");
const { configMsg, app, pingBot } = require("./config/config");

const { writeFile, readFile } = require("./libs/fileHelper");
const { startJob } = require("./libs/cronjob");
const messageHandling = () => {
    try {
        const getToken = app && app == "prod" ? pingBot.prodToken : pingBot.devToken;
        const telegram = new TelegramBot(getToken, { polling: true });
        telegram.on("text", async (message) => {
            const { text } = message;
            const username = message.from.username ? (message.from.username || message.chat.username) : (message.from.first_name || message.from.last_name);
            if(text.toLowerCase().indexOf("/help") === 0){
                telegram.sendMessage(message.chat.id, `
Hello ${username}! vui lòng cung cấp lệnh bên dưới ❤️
/add tên quán ăn - Thêm quán ăn, vd: /add Quán ăn Hoàng Gia
/remoce tên quán ăn - Xoá quán ăn, vd: /remove 0 hoặc /remove quán ăn Hoàng Gia
/lists - Danh sách quán ăn
Cảm ơn 😘
`)
            }
            if(text.toLowerCase().includes(configMsg.add)){
                // Add Cửa hàng
                const restaurantName = text.split("/add ")[1]
                writeFile(restaurantName);
            }
            else if(text.toLowerCase().includes(configMsg.remove)){
                // Remove cửa hàng
                telegram.sendMessage(message.chat.id, "Đang phát triển 😘");
            }
            else if(text.toLowerCase().includes(configMsg.lists)){
                // Show List
                readFile();
            }
        })
        return true;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
messageHandling();
startJob();
