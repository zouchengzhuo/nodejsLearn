/**
 * Created by czzou on 2016/12/12.
 */
"use strict"

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const fs=require("fs");

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        var worker=cluster.fork();
        //cluster已经处理过了child process的stdin、out、err，故此处是访问不到worker的std对象的
        //var stream=fs.createWriteStream(`worker_${worker.id}.txt`);
        //console.log(worker.process.stdout==null);
        //worker.process.stdout.pipe(stream);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
});
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        console.log("=== get request ===");
        res.writeHead(200);
        res.end('hello world 8000\n');
    }).listen(8000);
    console.log("=== server listening on port 8000,work id:",cluster.worker.id);
    http.createServer((req, res) => {
        console.log("=== get request ===");
        res.writeHead(200);
        res.end('hello world 8001\n');
    }).listen(8001);
    console.log("=== server listening on port 8001,work id:",cluster.worker.id);
}