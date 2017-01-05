/**
 * Created by czzou on 2017/1/5.
 */
const net=require('net');
const server=net.createServer();
const serverHost='127.0.0.1';
const serverPort=8888;

server.on('connection',(clientSocket)=>{
    clientSocket.setEncoding('utf8');
    clientSocket.on('data',(data)=>{
        console.log(`client say:${data}`);
    });
    clientSocket.on('error',(e)=>{console.log(e)});
});

server.listen({host:serverHost,port:serverPort},()=>{
    console.log(`server is listening on port ${8888}`)
});