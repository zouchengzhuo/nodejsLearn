/**
 * Created by czzou on 2016/1/11.
 */
var util=require("util");
var eventEmitter=require("events");

function myClass(){

    eventEmitter.call(this);
}
util.inherits(myClass, eventEmitter);

var myObj=new myClass();
myObj.on("myevent",function(arg1,arg2){
    console.log(arg1+arg2);
});
myObj.emit("myevent",8,9);