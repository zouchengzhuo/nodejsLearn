/**
 * Created by czzou on 2017/3/6.
 */

var m3=require("./m3");

//导出一个函数，内部持有别的函数，每次new创建一个对象
function fn(){
    console.log("new m5");
    this.m3=new m3();
}

module.exports=fn;