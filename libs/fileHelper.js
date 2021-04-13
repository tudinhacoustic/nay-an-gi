const fs = require("fs");
const file = "./json/quan-an.json";
const { sendTelegramNoti } = require("./sendTelegram");

const writeFile = (stringData) => {
    const msgFailed =  "Thêm Tên quán thất bại";
    fs.readFile(file, (err, data) => {
        if(err){
            console.error(err);
            sendTelegramNoti(msgFailed);
            return
        }
        const obj = JSON.parse(data);
        const count = Object.keys(obj).length += 1;
        const existName = [];
        for(let index = 1; index < count; index++){
            if(obj[index] == stringData){
                existName.push(obj[index])
            }
        }
        if(existName.length > 0){
            const msg = `Tên quán tồn tại: ${existName[0]}`;
            console.log(msg);
            sendTelegramNoti(msg);
            return
        }
        obj[count] = stringData;
        let json = JSON.stringify(obj);
        fs.writeFile(file, json, 'utf8', (err, data) => {
            if(err) {
                console.error(err);
                sendTelegramNoti(msgFailed);
                return
            };
        });
        const msg = `
Thêm: ${stringData}, Thành công 😉
/lists - Danh sách quán cơm
`; 
            sendTelegramNoti(msg);
    })
    return true;
}
const readFile = () => {
    const msgFailed =  "Mở File thất bại";
    fs.readFile(file, (err, data) => {
        if(err){
            console.error(err);
            sendTelegramNoti(msgFailed);
            return
        }
        let restaurantName = [];
        const obj = JSON.parse(data);
        const count = Object.keys(obj).length += 1;
        for(let index = 1; index < count; index++){
            restaurantName.push(`👉 ${obj[index]}`)
        }
        const msg = `
Danh sách quán ăn 💁‍♀️
${restaurantName.join("\n")}`;
    sendTelegramNoti(msg);
    })
}
module.exports = {
    writeFile,
    readFile,
}