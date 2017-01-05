/**
 * Created by czzou on 2017/1/5.
 */
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('./private.key'),
    cert: fs.readFileSync('./server.crt')
};
https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end('hello https');
}).listen(8866);