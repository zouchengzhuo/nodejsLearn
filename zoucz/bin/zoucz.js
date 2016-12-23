#!/usr/bin/env node
var util=require("util");
console.log("hello,i'm zouchegnzhuo,you can type command name/site/email");
var cmd=process.argv[2];
if(cmd){
    switch(cmd){
        case "name":
            console.log("邹成卓");
            break;
        case "site":
            console.log("http://zoucz.com");
            break;
        case "email":
            console.log("405966530@qq.com");
            break;
    }
}