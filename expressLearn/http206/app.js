/**
 * Created by czzou on 2015/12/14.
 */
var express=require("express"),
    debug=require("debug")("http206"),
    app=express(),
    testcontent="123456789abcdefghijklmnopqrstxyz";
app.use(express.static("static"));
app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/partial',function(req,res){

    var rangestr=req.headers.range;
    var reg=/^bytes=(\d+)\-(\d+)$/;
    if(!reg.test(rangestr)){
        res.status(416);
        res.send("请求范围不合理");
    }
    else{
        var range=reg.exec(rangestr);
        var start=range[1];
        var end=range[2];
        if(start>end){
            res.status(416);
            res.send("请求范围不合理");
        }
        res.status(206);
        res.set("Content-Range","bytes "+start+"-"+end);
        debug(testcontent.slice(start,end));
        res.send(testcontent.slice(start,end));
    }
    res.end();
})
var server=app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});