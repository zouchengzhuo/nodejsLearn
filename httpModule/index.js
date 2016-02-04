/**
 * Created by czzou on 2016/2/2.
 */
var http=require("http");
var fs=require("fs");

/**
 *  http.ClientRequest对象，通过http.request方法获取，respone事件来获取IncomingMessage  用来从网上下载资源，相当于自己实现个wget
 */
function t1(){
    var options = {
        port: 80,
        hostname: 'www.baidu.com',
        method: 'GET',
        path: 'www.baidu.com:80'
    };
    var req=http.request(options);
    req.end();
    req.on("response",function(res){
        var writeStream=fs.createWriteStream("baidu.html");
        res.pipe(writeStream);
    })
}
t1();