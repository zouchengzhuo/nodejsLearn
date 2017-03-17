/**
 * Created by czzou on 2017/3/6.
 */

var m3=require("./m3");
var m3Obj=new m3();

//导出一个函数，内部持有别的函数导出函数的同一对象
function fn(){
    console.log("new m4");
    this.m3=m3Obj;
}

module.exports=fn;