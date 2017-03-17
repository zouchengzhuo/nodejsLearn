/**
 * Created by czzou on 2017/3/6.
 */

var m1=require("./m1");
var m2=require("./m2");


console.log("m1===m1",m1===m1);
console.log("m2===m2",m2===m2);

var m3=require("./m3");
var m3obj1=new m3();
var m3obj2=new m3();
console.log("m3obj1===m3obj2",m3obj1===m3obj2);
console.log("m3obj1.m1===m3obj2.m1",m3obj1.m1===m3obj2.m1);
console.log("m3obj1.m2===m3obj2.m2",m3obj1.m2===m3obj2.m2);

var m4=require("./m4");
var m4obj1=new m4();
var m4obj2=new m4();
console.log("m4obj1===m4obj2",m4obj1===m4obj2);
console.log("m4obj1.m3===m4obj2.m3",m4obj1.m3===m4obj2.m3);


var m5=require("./m5");
var m5obj1=new m5();
var m5obj2=new m5();
console.log("m5obj1===m5obj2",m5obj1===m5obj2);
console.log("m5obj1.m3===m5obj2.m3",m5obj1.m3===m5obj2.m3);