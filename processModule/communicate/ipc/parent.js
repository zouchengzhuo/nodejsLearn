/**
 * Created by czzou on 2017/3/17.
 */
const fork = require('child_process').fork;
const fs=require("fs");

let outStream=fs.createWriteStream("childMsg.txt");

//子进程stdio配置：
// ignore：直接把/dev/null定向给子进程的io
// pipe：在子进程和父进程之间建立管道，以访问child.stdio对象
// inherit：子进程使用父进程的stdio对象
// ipc：这个是一定要的，建立父子进程的IPC通道
let child = fork(`${__dirname}/child.js`/*,{stdio:["pipe",process.stdout,"pipe","ipc"]}*/);
//child.stdout.pipe(outStream);

setInterval(()=>{
    child.send({msg:"i'm parent"});
},1000);
child.on("message",function(message,handler){
    console.log("recevie message from child:",message,handler);
});


