const cron = require("node-cron");
const { randomMsg } = require("./random");

const startJob = async () => {
    try {
        cron.schedule('00 00 11 * * 0-6', async () => {
            randomMsg();
        }, {
            scheduled: true,
            timezone: 'Asia/Bangkok'
        })
    } catch (err) {
        console.error(err);
        throw err;
    }
}
module.exports = {
    startJob
}