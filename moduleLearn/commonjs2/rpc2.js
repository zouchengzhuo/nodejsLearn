/**
 * Created by czzou on 2017/3/6.
 */
var registry=require("./registry");
setInterval(function(){
    registry.b(registry.a+1000);
    console.log("registry.a",registry.a);
},1000);



