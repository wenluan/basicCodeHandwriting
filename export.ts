let obj2 = {
    name: 'a',
};

function changeObj() {
    obj2.name = 'b';
}

module.exports = {
    obj2,
    changeObj,
}