require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const { fetchSearchData } = require("./fetchData");
const { removeAccents, delay } = require("../utils/utils");

const token = process.env.YOUR_TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const data = require("../../data/detailsData.json");
const description = data.items[0].snippet.description;
// get all the links from description
const links = description.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
);
console.log(links);
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const resp = "Welcome to Youtube Bot";
    console.log(`${resp}`);
    bot.sendMessage(chatId, resp);
});
// read all message
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    var text = "";
    for (var i = 0; i < links.length; i++) {
        text += links[i] + "\n"; // or however you want to format it
    }
});
