/**
 * Created by czzou on 2017/3/17.
 */
let i=0;
setInterval(function(){
    console.log("from child process:",i++);
    process.send({msg:"i'm child process!"});
    //process.exit(0);
},1000);
process.on("message",function(message,handler){
    console.log("recevie message from parent:",message,handler);
});