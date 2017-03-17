/**
 * Created by czzou on 2017/3/7.
 */
var rpc3=require("./rpc3");

var obj1=new rpc3();
var obj2=new rpc3();

console.log("obj1===obj2",obj1===obj2);
console.log("obj1.dns===obj2.dns",obj1.dns===obj2.dns);
console.log("obj1.registry===obj2.registry",obj1.registry===obj2.registry);

obj1.registry.b(666);
///obj2.registry.b(222);
console.log(obj1.registry.a,obj2.registry.a);
