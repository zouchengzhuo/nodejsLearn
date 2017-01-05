/**
 * Created by czzou on 2017/1/5.
 */
const net=require('net');
const socket=new net.Socket();
const serverHost='127.0.0.1';
const serverPort=8888;

let index=0;
socket.on('error',(e)=>{console.log(e)});
socket.connect({host:serverHost,port:serverPort},()=>{
    console.log(`client has connected to host ${serverHost} , port ${serverPort}`);
    setInterval(()=>{
        socket.write(`i love u ${index++}`);
    },3000);
});