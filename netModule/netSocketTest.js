/**
 * Created by czzou on 2016/1/7.
 */
var net = require("net");

/**
 * 初始化net clientSocket对象，测试发送数据，关闭连接
*/
function t1(autoclose){
    var inteval;
    var socket1=new net.Socket({
        readable:true,
        writable:true,
        allowHalfOpen:true
    });
    socket1.on("data",function(data){
        console.log("recived from server:"+data.toString());
    });
    socket1.on("close",function(){
        console.log(" client closed success ");
    });
    socket1.on("error",function(err){
        console.log(" client error: ",err);
    });
    socket1.connect({
        host:"localhost",
        port:8889
    },function(){
        console.log(" server connected");
        inteval=setInterval(function(){
            socket1.write("hello,i'm client!"+Math.random())
        },3000)
    });
    if(autoclose){
        setTimeout(function(){
            socket1.destroy();
            clearInterval(inteval)
            //socket1.end("我结束了","utf8");
        },3000);
    }
}

/**
 * 通过net.connect创建clientSocket对象
 */
function t2(){
    var client = net.connect({port: 8889},
        function() { //'connect' listener
            console.log('connected to server!!!');
            client.write('world!\r\n');
        });
    client.on('data', function(data) {
        console.log(data.toString());
        //client.end();
    });
    client.on('end', function() {
        console.log('disconnected from server');
    });

}

t1(false);
t1(true);
//t2();
//for(var i=0;i<1000;i++){
//    console.log("连接个数：",i+1);
//    t1(false);
//}