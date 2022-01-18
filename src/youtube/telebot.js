// require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const token = process.env.YOUR_TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const listkeywords = require("./data/keywords.json");

bot.onText(/\/addkeyword (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(`add keyword: ${resp}`);
    if (listkeywords.includes(resp)) {
        bot.sendMessage(chatId, "This keyword already exists");
    } else {
        listkeywords.push(resp);
        fs.writeFileSync("./data/keywords.json", JSON.stringify(listkeywords));
        bot.sendMessage(chatId, `${resp} has been added to keywords`);
    }
});
bot.onText(/\/removekeyword (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(`${resp} has been removed from keywords`);
    if (listkeywords.includes(resp)) {
        listkeywords.splice(listkeywords.indexOf(resp), 1);
        fs.writeFileSync("./data/keywords.json", JSON.stringify(listkeywords));
        bot.sendMessage(chatId, `${resp} has been removed from keywords`);
    } else {
        bot.sendMessage(chatId, `${resp} is not in keywords`);
    }
});
bot.onText(/\/listkeyword/, (msg) => {
    const chatId = msg.chat.id;
    const resp = listkeywords.join("\n");
    console.log(`add keyword: ${resp}`);
    bot.sendMessage(chatId, `list of keywords: \n${resp}`);
});
// bot keyborad
bot.onText(/\/keyboard/, (msg) => {
    const chatId = msg.chat.id;
    const resp = {
        reply_markup: {
            keyboard: [["/addkeyword", "/removekeyword", "/listkeyword"]],
            resize_keyboard: true,
            one_time_keyboard: false,
        },
    };
    console.log(`keyboard: ${resp}`);
    bot.sendMessage(chatId, "keyboard", resp);
});
const { sendData } = require("./fetchData");

// send data to telegram every 1 hour

let i = 0;
setInterval(async () => {
    const data = await sendData(listkeywords);
    data.forEach((item) => {
        if (item.length === 0) {
            console.log("Array is empty! - no new data");
        } else {
            const chatId = process.env.CHAT_ID;
            const title = item[0].snippet.title;
            const description = item[0].snippet.description;
            const url = `https://www.youtube.com/watch?v=${item.id}`;

            console.log(`send data: ${url}`);
            bot.sendMessage(chatId, `${description}`);
            bot.sendMessage(chatId, `${title}\n${url}`);
        }
    });

    i = i + 1;
    console.log(`call function : ${i}`);
}, 1000 * 60 * 60);

module.exports = null;
