/**
 * Created by czzou on 2016/12/15.
 */
"use strict"

const fs=require("fs");
const wirteStream=fs.createWriteStream("log.txt");
let index=0;
setInterval(function(){
    wirteStream.write(`${new Date} log str ${index++} from process ${process.pid} \r\n`);
},1000);