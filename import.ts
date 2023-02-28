let obj3 = require('./export').obj2;
let change = require('./export').changeObj;
change();
console.log(JSON.stringify(obj3));