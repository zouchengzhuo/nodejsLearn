/**
 * Created by czzou on 2016/12/28.
 */
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('./rsa/keys/private.key'),
    cert: fs.readFileSync('./rsa/keys/server.crt')
};
https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end('hello https');
}).listen(8888);