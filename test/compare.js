// ramdom data
const arr1 = [
    {
        id: "39df49",
        title: "kuowng dan kdo",
    },
    {
        id: "3df950",
        title: "fsdkfdfgdfg",
    },
    {
        id: "395sdf1",
        title: "sdfsdfsd",
    },
];
const arr2 = [
    {
        id: "39dsdfsdf49",
        title: "baos oke ",
    },
    {
        id: "39dsdfsd2342f49",
        title: "baos okedzxfsdafsdf ",
    },
    {
        id: "39df49",
        title: "kuowng dan kdo",
    },
    {
        id: "3df950",
        title: "fsdkfdfgdfg",
    },
    {
        id: "395sdf1",
        title: "sdfsdfsd",
    },
];
// compare arr1 arr2
const compare = (arr1, arr2) => {
    let result = [];
    arr2.forEach((item) => {
        if (!arr1.find((item2) => item2.id === item.id)) {
            result.push(item);
        } else {
            return;
        }
        // console.log("loop");
    });
    return result;
};
const result = compare(arr1, arr2);
console.log(result.reverse());
