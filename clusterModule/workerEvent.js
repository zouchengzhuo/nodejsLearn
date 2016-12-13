/**
 * Created by czzou on 2016/12/13.
 */
"use strict"
const cluster=require("cluster");
const http=require("http");
const cpus=require("os").cpus();
const util=require("util");

//执行创建worker操作
if(cluster.isMaster){
    cpus.forEach(function(cpu,index){
        let worker=cluster.fork();
        //worker的IPC断开时触发，一般在进程退出前或调用worker.disconnct时触发
        worker.on('disconnect', () => {
            console.log(` worker ${worker.id} disconnect`);
        });
        //通过throw error触发
        worker.on('error', (err) => {
            console.log(` worker ${worker.id} error ${util.inspect(err)}`);
        });
        //进程退出时触发，可在cluster的exit事件中启动一个新的worker
        worker.on('exit', (code,signal) => {
            console.log(` worker ${worker.id} exit with code ${code} and signal ${signal}`);
        });
        //开始监听端口时触发
        worker.on('listening', (address) => {
            console.log(` worker ${worker.id} listening ${util.inspect(address)}`);
        });
        //通过child_process.send触发
        worker.on('message', (msg) => {
            console.log(` worker ${worker.id},pid ${worker.process.pid} message ${util.inspect(msg)}`);
        });

    });
}
//执行worker逻辑
else{
    http.createServer((req, res) => {
        console.log(`=== worker ${process.pid} get request ===`);
        process.send({ cmd: 'notifyRequest' });
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);
    //触发worker的error事件
    //setTimeout(function () {
    //    throw new Error("worker throw error");
    //},3000);
}