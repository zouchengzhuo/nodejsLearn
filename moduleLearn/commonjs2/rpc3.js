/**
 * Created by czzou on 2017/3/6.
 */
var registry=require("./registry");

function rpc(){
    this.registry=registry;
    //this.dns=function(v){
    //    registry.b(v);
    //}
}

rpc.prototype.dns=function(v){
    registry.b(v)
}

module.exports=rpc;



