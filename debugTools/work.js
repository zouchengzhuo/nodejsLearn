/**
 * Created by czzou on 2015/12/7.
 */
var debug=require("debug")("mydebug:work");
setInterval(function(){
    debug("doing some work @ %s —— %s",new Date().getTime(),"with supervisor  xxxxxxx");
},2000);