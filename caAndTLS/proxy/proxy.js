/**
 * Created by czzou on 2017/1/5.
 */
const net=require('net');
const proxyServer=net.createServer();

const proxyHost='127.0.0.1';
const proxyPort=8889;

const serverHost='127.0.0.1';
const serverPort=8888;

//代理连接到真实目标Server
const proxySocket=new net.Socket();
proxySocket.connect({host:serverHost,port:serverPort},()=>{
    console.log(`proxy has connected to host ${serverHost} , port ${serverPort}`);
});
//启动代理Server
proxyServer.on('connection',(clientSocket)=>{
    //直接将客户端的数据发给真实目标Server
    //clientSocket.pipe(proxySocket);

    //篡改数据后发送
    clientSocket.setEncoding('utf8');
    clientSocket.on('data',(data)=>{
        data=data.replace(/love/g,'hate');
        proxySocket.write(data);
    });
});
proxyServer.listen({host:proxyHost,port:proxyPort},()=>{
    console.log(`proxy server is listening on port ${8889}`)
});