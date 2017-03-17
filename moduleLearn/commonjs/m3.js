/**
 * Created by czzou on 2017/3/6.
 */

var m1=require("./m1");
var m2=require("./m2");

//导出一个函数，内部持有直接导出的其他模块对象

function fn(){
    console.log("new m3");
    this.m1=m1;
    this.m2=m2;
}

module.exports=fn;