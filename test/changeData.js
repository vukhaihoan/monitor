const arr1 = [
    {
        key: "tham gia ido",
        data: ["id1", "id2", "id3"],
    },
    {
        key: "keo ido",
        data: ["id2", "id5", "id6", "id7", "id10"],
    },

    {
        key: "whitelist ido",
        data: ["id5", "id3", "id1"],
    },
    {
        key: "list ido",
        data: ["id8", "id6", "id1", "id9", "id10"],
    },
];
const arr2 = [
    {
        id: "id1",
        keyword: ["tham gia ido", "whitelist ido", "list ido"],
    },
    {
        id: "id2",
        keyword: ["tham gia ido", "keo ido"],
    },
    { id: "id3", keyword: ["tham gia ido", "whitelist ido"] },
    { id: "id5", keyword: ["keo ido", "whitelist ido"] },
    { id: "id6", keyword: ["keo ido", "list ido"] },
    { id: "id8", keyword: ["list ido"] },
];
// change format of data from arr1 to arr2
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
console.log(changeFormatData(arr1));
