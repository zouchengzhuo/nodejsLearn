/**
 * Created by Administrator on 2016/1/10.
 */
var fs=require("fs");
//var fileBuffer=fs.readFileSync("dnf.exe");
//console.log(fileBuffer,fileBuffer.length);
//fs.writeFileSync("dnf2.exe",fileBuffer);

var readStream=fs.createReadStream("dnf.exe");
var writeStream=fs.createWriteStream("dnf3.exe");
readStream.on('readable', function() {
    var chunk;
    while (null !== (chunk = readStream.read())) {
        console.log(chunk, chunk.length);
        writeStream.write(chunk)
    }
});


var req = http.request(options, function(req, res) {
    res.pipe(response);
}).end();


var readStream=fs.createReadStream("dnf.exe");
readStream.pipe(response);
