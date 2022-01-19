// ramdom data
const arr1 = [
    "9En5ldjrhvg",
    "-TVlTduEnro",
    "613yhNWSYaE",
    "7sjYI-LJXQw",
    "hBBGpqny5vk",
    "4Qr_KS4a-GA",
    "Ko3Y04uZOFM",
    "iN6w64_8NNc",
    "lkvumUQw60g",
    "XF3xeQUHczI",
    "TY6OMsq-T0Q",
    "yX_QFJHw-Ok",
    "dw4fo6Acn-I",
    "iNr3r_Ln-Rk",
    "qAMQx5rCuu8",
    "SsqlkMFKojI",
    "7OezAJnRpJs",
    "62Nn1lW2hhA",
    "tkvPobaS6bU",
    "8N20TMBjlLg",
    "Nv12RicfgCI",
    "TnxY3TEc0ow",
    "6zyWXdvvBKE",
    "_GGv9dI429Q",
    "ge7ZhF989o8",
    "Ov06CtqZjyg",
    "r5MV0-zwjiY",
    "9x6IMzUrtMM",
    "6qy5ffnUAw4",
    "HcQWIcVq5xg",
    "gNQ9CtrUq6I",
    "j4OIfVAQgd4",
    "1QQcG8gdApA",
    "DdJ1Y4qBU8Y",
    "TQZcC5rQIhY",
    "eHR7uWFim7c",
    "7nZ8MbLdJpA",
    "amnmQjF4Klc",
    "068KThJGIPg",
    "Uxx6UPC4HNI",
    "GgsyOanG5BI",
    "sixypF0kyZc",
    "cI16_IwKgEw",
    "f6hgU_Hb_-Q",
    "I1GYkjgQQ_w",
    "XkzVqiKjxsw",
];
const arr2 = [
    "zDHuTPIURoI",
    "_6Dq7pHgxZI",
    "gWWx7hQfyJU",
    "9En5ldjrhvg",
    "-TVlTduEnro",
    "613yhNWSYaE",
    "7sjYI-LJXQw",
    "hBBGpqny5vk",
    "4Qr_KS4a-GA",
    "Ko3Y04uZOFM",
    "iN6w64_8NNc",
    "lkvumUQw60g",
    "XF3xeQUHczI",
    "TY6OMsq-T0Q",
    "yX_QFJHw-Ok",
    "dw4fo6Acn-I",
    "iNr3r_Ln-Rk",
    "qAMQx5rCuu8",
    "SsqlkMFKojI",
    "7OezAJnRpJs",
    "62Nn1lW2hhA",
    "tkvPobaS6bU",
    "8N20TMBjlLg",
    "Nv12RicfgCI",
    "TnxY3TEc0ow",
    "6zyWXdvvBKE",
    "_GGv9dI429Q",
    "ge7ZhF989o8",
    "Ov06CtqZjyg",
    "r5MV0-zwjiY",
    "9x6IMzUrtMM",
    "6qy5ffnUAw4",
    "HcQWIcVq5xg",
    "gNQ9CtrUq6I",
    "j4OIfVAQgd4",
    "1QQcG8gdApA",
    "DdJ1Y4qBU8Y",
    "TQZcC5rQIhY",
    "eHR7uWFim7c",
    "7nZ8MbLdJpA",
    "amnmQjF4Klc",
    "068KThJGIPg",
    "Uxx6UPC4HNI",
    "GgsyOanG5BI",
    "sixypF0kyZc",
    "cI16_IwKgEw",
    "f6hgU_Hb_-Q",
    "I1GYkjgQQ_w",
    "XkzVqiKjxsw",
    "H6IB2RLuye0",
];
// compare arr1 arr2
const compare = (arr1, arr2) => {
    let result = [];
    arr2.forEach((item) => {
        if (!arr1.find((item2) => item2 === item)) {
            result.push(item);
        } else {
            return;
        }
        // console.log("loop");
    });
    return result.reverse();
};
const result = compare(arr1, arr2);
console.log(result);
const arr11 = ["a", "b", "c", "d", "e"];
const arr21 = ["*", "a", "b", "c", "d"];
const arr31 = ["*", "**", "a", "b", "c", "fsdjflsd"];
// find the difference between arr1 and arr2, when loop find the similar item stop loop
const result22 = arr31.filter((item) => !arr1.find((item1) => item1 === item));
// console.log(result);
const compareArr = (arr1, arr2) => {
    // arr1 : old data
    // arr2 : new data
    let result = [];
    for (let i = 0; i < arr2.length; i++) {
        const item = arr2[i];
        if (!arr1.find((item2) => item2 === item)) {
            result.push(item);
        } else {
            break;
        }
    }
    return result.reverse();
};
const result2 = compareArr(arr11, arr31);
console.log(result2);
