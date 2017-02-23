/**
 * Created by czzou on 2017/2/22.
 */
var http = require('http')
var opt = {
    host:'119.36.190.201',
    port:'9000',
    method:'GET',//这里是发送的方法
    path:'https://www.baidu.com',     //这里是访问的路径
    headers:{
        //这里放期望发送出去的请求头
    }
}
//以下是接受数据的代码
var body = '';
var req = http.request(opt, function(res) {
    console.log("Got response: " + res.statusCode);
    res.on('data',function(d){
        body += d;
    }).on('end', function(){
        console.log(res.headers)
        console.log(body)
    });

}).on('error', function(e) {
    console.log("Got error: " + e.message);
})
req.end();