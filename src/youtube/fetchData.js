const axios = require("../utils/axios");
const fs = require("fs");
const { removeAccents } = require("../utils/utils");
function fetchSearchData(q) {
    console.log(`fetching data for ${q}`);
    // https://www.googleapis.com/youtube/v3/search?part=snippet&q="kèo ido"&type=video&key=&order=date&maxResults=50
    const searchPraram = q.split(" ").join("+");
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${process.env.YOUTUBE_API_KEY}&order=date&maxResults=25`;
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
                },
                params: {
                    q: `${searchPraram}`,
                },
            })
            .then((res) => {
                resolve(res.data);
                // resolve(res);
            })
            .catch((err) => {
                if (err.response.status !== 200) {
                    console.log(err.response.data);
                    throw new Error(`API call failed with status code: ${err.response.status} after 5 retry attempts`);
                }
                // console.log(err);
                // reject(err);
            });
    });
}
function fetchDetailsData(id) {
    // https://www.googleapis.com/youtube/v3/videos?part=snippet&id=_UpAbnR2hiI
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "user-agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                if (err.response.status !== 200) {
                    console.log(err.response.data);
                    throw new Error(`API call failed with status code: ${err.response.status} after 5 retry attempts`);
                }
            });
    });
}

// const preData = require("./data/searchData.json");

// const response = await fetchDetailsData("_6Dq7pHgxZI");
// fs.writeFileSync("./data/detailsData.json", JSON.stringify(respost));
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

async function compareData(keyword) {
    const name = removeAccents(keyword).split(" ").join("_");
    const preData = JSON.parse(fs.readFileSync(`./data/searchData/${name}.json`));
    const preDataIdlist = preData.items.map((item) => item.id.videoId);
    const response = await fetchSearchData(keyword);
    const newDataIdlist = response.items.map((item) => item.id.videoId);
    const result = compareArr(preDataIdlist, newDataIdlist);
    console.log(`${keyword} has ${result.length} new videos :`);
    console.log(result);
    fs.writeFileSync(`./data/searchData/${name}.json`, JSON.stringify(response));
    return result;
}
function changeFormatData(arr1) {
    const arr2 = [];
    arr1.forEach((element) => {
        element.data.forEach((id) => {
            // check if id is exist in arr2
            const index = arr2.findIndex((item) => {
                return item.id === id;
            });
            if (index === -1) {
                arr2.push({
                    id,
                    keyword: [element.key],
                });
            } else {
                arr2[index].keyword.push(element.key);
            }
        });
    });
    return arr2;
}
async function multiFetchData(keyword) {
    const arr1 = await Promise.all(
        keyword.map(async (key) => {
            const data = await compareData(key);
            return {
                key,
                data,
            };
        })
    );
    const arr2 = changeFormatData(arr1);
    const dataSend = Promise.all(
        arr2.map(async (item) => {
            const response = await fetchDetailsData(item.id);
            return {
                videoId: item.id,
                keywords: item.keyword,
                data: response,
            };
        })
    );
    return dataSend;
}
module.exports = {
    fetchSearchData,
    fetchDetailsData,
    sendData: multiFetchData,
};
