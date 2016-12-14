/**
 * Created by czzou on 2016/12/13.
 */
const http=require("http");
var index=0;
http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`hello world ${index++},process:${process.pid}`);
}).listen(8000);