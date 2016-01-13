/**
 * Created by czzou on 2015/12/15.
 */
process.argv.forEach(function (value,index,array) {
    console.log(index,value);
})
console.log("cuurent derctory",process.cwd());
console.log("process.env",JSON.stringify(process.env))
var buffer=new Buffer([0,1,2])
