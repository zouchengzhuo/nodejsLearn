/**
 * Created by czzou on 2017/3/6.
 */
var registry=require("./registry");
console.log("registry.a",registry.a);
//var registry2=Object.create(registry);
var registry2=require("./registry");
console.log("registry===registry2",registry===registry2);
console.log("registry2.a",registry2.a);

registry2.b(666);
//registry2.a=666;
console.log("changed registry.a",registry.a);
console.log("changed registry2.a",registry2.a);


