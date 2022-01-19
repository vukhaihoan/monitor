require("dotenv").config();
const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect mongodb success");
}
main().catch((err) => console.log(err));
require("./src/youtube/telebot");
