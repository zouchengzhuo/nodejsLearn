/**
 * Created by czzou on 2015/12/14.
 */
var express=require("express");
var multipart=require("connect-multiparty");
var path=require("path");
var fs=require("fs");
var debug=require("debug")("zczdebug");
//文件上传地址，无则创建
var myuploadDir="../upload555";
myuploadDir=path.resolve(__dirname,myuploadDir);
if(!fs.existsSync(myuploadDir)){
    fs.mkdirSync(myuploadDir);
}
var multipartMiddlewale=multipart({
    uploadDir:myuploadDir,
    error: function (err) {
        debug("err",err);
    }
});


var app=express();
app.use(express.static("static"));
// 提供一个文件读取的服务
app.use(express.static(myuploadDir));
app.post("/uploadTest", function(req,res,next){
    console.log("step1");
    next();
},multipartMiddlewale,function (req, res) {
    var a=1;
    res.send("all files saved!");
});
var server=app.listen(8080, function () {
    var address="http://"+server.address().address+":"+server.address().port;
    debug("listening on",address)
})
