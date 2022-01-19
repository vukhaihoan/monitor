const data = require("../../data/detailsData.json");
const description = data.items[0].snippet.description;
// get all the links from description
const links = description.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
);
// remove link match keyword : binance ,gate, houbi, okex, mxc, hotbit, kuboin
const removeKeyword = ["binance", "gate", "huobi", "okex", "mxc", "hotbit", "kucoin", "cos"];
const removeLink = [];
links.forEach((element) => {
    removeKeyword.forEach((keyword) => {
        if (element.includes(keyword)) {
            removeLink.push(element);
        }
    });
});
const newLinks = links.filter((element) => {
    return !removeLink.includes(element);
});
console.log(newLinks);
//# sourceMappingURL=run.js.map
