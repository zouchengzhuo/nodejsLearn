/**
 * Created by czzou on 2017/3/7.
 */
exports.done = false;
var a = require('./a.js');
var test = require('./a.js').test;
console.log('在 b.js 之中，a.done = %j', a.done);
console.log('在 b.js 之中，a.test = %j', test,a.test);
exports.done = true;
console.log('b.js 执行完毕');
setTimeout(function(){
    console.log('1000ms后，在 b.js 之中，a.done = %j', a.done);
    console.log('1000ms后，在 b.js 之中，a.test = %j', test,a.test,require('./a.js').test);
},1000);