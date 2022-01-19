function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
function rn(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function removeAccents(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}
module.exports = {
    delay,
    rn,
    removeAccents,
};
