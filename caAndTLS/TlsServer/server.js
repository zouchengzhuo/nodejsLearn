/**
 * Created by czzou on 2017/1/5.
 */
const tls = require('tls');
const fs=require('fs');
const serverHost='127.0.0.1';
const serverPort=8888;
const options = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('server.crt')
};
var tlsServer = tls.createServer(options,(clientSocket) => {
    clientSocket.setEncoding('utf8');
    clientSocket.on('data',(data)=>{
        console.log(`client say:${data}`);
    });
    clientSocket.on('error',(e)=>{console.log(e)});
});

tlsServer.listen({host:serverHost,port:serverPort},()=>{
    console.log(`lts server is listening on port ${8888}`)
});