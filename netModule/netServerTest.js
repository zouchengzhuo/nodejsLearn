/**
 * Created by czzou on 2016/1/7.
 */
var net=require("net");

/**
 * 创建server
 */
function t1(){
    var server=net.createServer(function(socket){
        //socket.end("good bye!");
        socket.write("hello,i'm server!");
        var ad=socket.address();

        console.log("client connected! %j:%j",socket.remoteAddress,socket.remotePort);
        socket.on("data",function(data){
            console.log("recived from client:",data.toString());
        })
        socket.on("close",function(had_error){
            if(!had_error){
                console.log("client closed success! %j:%j",socket.remoteAddress,socket.remotePort);
            }
            else{
                console.log("client close error! %j:%j",socket.remoteAddress,socket.remotePort);
            }
        })
        socket.on("error",function(err){
            console.log("!!!err!!!",err);
        });
        //setTimeout(function(){
        //    socket.end("我结束了","utf8");
        //},3000);
    });
    server.listen({
        port:8889
    },function(){
        var address=server.address();
        console.log(" opened server on address %j ",address);
    });

    var a=1;
}
t1();