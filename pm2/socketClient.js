/**
 * Created by czzou on 2016/12/15.
 */
var net=require("net");


var client=new net.Socket();
client.connect(7777,"127.0.0.1");
client.on("connect",function(){
    client.write("zcz from "+process.pid);
});
client.on("error",function(e){
    console.log("client on error",e.message);
});