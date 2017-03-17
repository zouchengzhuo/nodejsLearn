/**
 * Created by czzou on 2017/3/17.
 */
const fs=require("fs");
const net=require("net");
//注意：windows下不支持监听临时文件
let sockPath=`${__dirname}/test.sock`;
let sock = net.connect(sockPath);
sock.write("hello i'm client");
sock.on("data",(chunk)=>{
    console.log(chunk.toString());
});