// require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const { fetchSearchData } = require("./fetchData");
const { removeAccents, delay } = require("../utils/utils");

const token = process.env.YOUR_TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const listkeywords = require("../../data/keywords.json");
const bannedLinkKeywords = require("../../data/bannedLinkKeywords.json");

bot.onText(/\/addkeyword (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(`add keyword: ${resp}`);
    if (listkeywords.includes(resp)) {
        bot.sendMessage(chatId, "This keyword already exists");
    } else {
        listkeywords.push(resp);
        fs.writeFileSync("./data/keywords.json", JSON.stringify(listkeywords));
        const response = await fetchSearchData(resp);
        const name = removeAccents(resp).split(" ").join("_");
        fs.writeFileSync(`./data/searchData/${name}.json`, JSON.stringify(response));
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
        const name = removeAccents(resp).split(" ").join("_");
        fs.unlinkSync(`./data/searchData/${name}.json`);
        bot.sendMessage(chatId, `${resp} has been removed from keywords`);
    } else {
        bot.sendMessage(chatId, `${resp} is not in keywords`);
    }
});
bot.onText(/\/listkeyword/, (msg) => {
    const chatId = msg.chat.id;
    const resp = listkeywords.join("\n");
    console.log(`list keyword:\n${resp}`);
    bot.sendMessage(chatId, `list of keywords: \n${resp}`);
});

bot.onText(/\/addbannedlink (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(`add banned link: ${resp}`);
    if (bannedLinkKeywords.includes(resp)) {
        bot.sendMessage(chatId, "This link already exists");
    } else {
        bannedLinkKeywords.push(resp);
        fs.writeFileSync("./data/bannedLinkKeywords.json", JSON.stringify(bannedLinkKeywords));
        bot.sendMessage(chatId, `${resp} has been added to banned link keywords`);
    }
});
bot.onText(/\/removebannedlink (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    console.log(`${resp} has been removed from banned link keywords`);
    if (bannedLinkKeywords.includes(resp)) {
        bannedLinkKeywords.splice(bannedLinkKeywords.indexOf(resp), 1);
        fs.writeFileSync("./data/bannedLinkKeywords.json", JSON.stringify(bannedLinkKeywords));
        bot.sendMessage(chatId, `${resp} has been removed from banned link keywords`);
    } else {
        bot.sendMessage(chatId, `${resp} is not in banned link keywords`);
    }
});
bot.onText(/\/listbannedlink/, (msg) => {
    const chatId = msg.chat.id;
    const resp = bannedLinkKeywords.join("\n");
    console.log(`list banned link:\n${resp}`);
    bot.sendMessage(chatId, `list of banned link keywords: \n${resp}`);
});
// bot keyboard
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
    data.forEach((element) => {
        if (element.length === 0) {
            console.log("Array is empty! - no new data");
        } else {
            element.forEach(async (miniElement) => {
                const chatId = process.env.CHAT_ID;
                const title = miniElement.items[0].snippet.title;
                const description = miniElement.items[0].snippet.description;
                const links = description.match(
                    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                );
                const url = `https://www.youtube.com/watch?v=${miniElement.items[0].id}`;
                const removeLink = [];
                links.forEach((element) => {
                    bannedLinkKeywords.forEach((keyword) => {
                        if (element.includes(keyword)) {
                            removeLink.push(element);
                        }
                    });
                });
                const newLinks = links.filter((element) => {
                    return !removeLink.includes(element);
                });
                console.log(newLinks);
                var text = "";
                for (var i = 0; i < links.length; i++) {
                    text += links[i] + "\n"; // or however you want to format it
                }
                console.log(`send data: ${url}`);
                // bot.sendMessage(chatId, `${description}`);
                bot.sendMessage(chatId, `${url} \n<u>List link</u> : \n${text}`, { parse_mode: "HTML" });
                await delay(3000);
            });
        }
    });

    i = i + 1;
    console.log(`call function : ${i}`);
}, 1000 * 60 * 60);

module.exports = null;
