require("dotenv").config();
// const mongoose = require("mongoose");
const { fetchSearchData } = require("./src/youtube/fetchData");
const listkeywords = require("./data/keywords.json");
const { removeAccents } = require("./src/utils/utils");
const fs = require("fs");
async function main() {
    // await mongoose.connect(process.env.MONGODB_URL);
    // console.log("connect mongodb success");
    listkeywords.forEach(async (keyword) => {
        const data = await fetchSearchData(keyword);
        const name = removeAccents(keyword).split(" ").join("_");
        fs.writeFileSync(`./data/searchData/${name}.json`, JSON.stringify(data));
    });
}
// main().catch((err) => console.log(err));
main();
require("./src/youtube/telebot");
