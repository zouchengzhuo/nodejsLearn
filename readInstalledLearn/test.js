/**
 * Created by czzou on 2016/12/26.
 */
var readInstalled = require("read-installed");
var util=require("util");
// optional options
var options = { dev: false, log: null, depth: 2 }
readInstalled("./", options, function (er, data) {
    console.log(util.inspect(data.dependencies));
});