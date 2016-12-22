/**
 * Created by czzou on 2016/12/15.
 */
var net=require("net");
var server=net.createServer();
server.on("listening",function(){
    console.log("server is listening on process",process.pid);
})
server.listen(7777,"127.0.0.1");

var index=1;
server.on("connection", function (socket) {
    console.log("connect to process ",process.pid,"num:",index++);
    bindEvent(socket);
});
server.on("close", function () {
    console.log("on close");

});
server.on("error", function (e) {
    console.log("server on error:",e.message);
});
function bindEvent(socket){
    socket.on("data", function(data){
        console.log("recive data on process ",process.pid," data:",data.toString("utf8"))
    });
    socket.on("error",function(e){
        console.log("on error",e.message);
    })
}