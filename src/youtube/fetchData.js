const axios = require("../utils/axios");
const fs = require("fs");
function fetchSearchData(q) {
    // https://www.googleapis.com/youtube/v3/search?part=snippet&q="tham gia ido"&type=video&order=date
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&&type=video&order=date&maxResults=50&q="${q}"&key=${process.env.YOUTUBE_API_KEY}`;
    return new Promise((resolve, reject) => {
        axios
            .get(url)
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
function fetchDetailsData(id) {
    // https://www.googleapis.com/youtube/v3/videos?part=snippet&id=_UpAbnR2hiI
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
    return new Promise((resolve, reject) => {
        axios
            .get(url)
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

const preData = require("./data/searchData.json");

// const response = await fetchDetailsData("_6Dq7pHgxZI");
// fs.writeFileSync("./data/detailsData.json", JSON.stringify(respost));
const compareArr = (arr1, arr2) => {
    // arr1 : old data
    // arr2 : new data
    let result = [];
    arr2.forEach((item) => {
        if (!arr1.find((item2) => item2.id === item.id)) {
            result.push(item);
        } else {
            return;
        }
    });
    return result.reverse();
};
async function compareData(keyword) {
    const preDataIdlist = preData.items.map((item) => item.id.videoId);

    const response = await fetchSearchData(keyword);
    const newDataIdlist = response.items.map((item) => item.id.videoId);
    const result = compareArr(preDataIdlist, newDataIdlist);

    const dataSend = await Promise.all(
        result.map(async (id) => {
            return await fetchDetailsData(id);
        })
    );
    fs.writeFileSync("./data/searchData.json", JSON.stringify(response));
    return dataSend;
}
async function multiFetchData(keyword) {
    const dataSend = await Promise.all(
        keyword.map(async (key) => {
            return await compareData(key);
        })
    );

    return dataSend;
}
module.exports = {
    fetchSearchData,
    fetchDetailsData,
    sendData: multiFetchData,
};
