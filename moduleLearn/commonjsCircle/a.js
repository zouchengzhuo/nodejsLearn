/**
 * Created by czzou on 2017/3/7.
 */
exports.done = false;
var b = require('./b.js');
exports.test = "test";
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');