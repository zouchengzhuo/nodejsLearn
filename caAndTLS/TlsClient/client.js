/**
 * Created by czzou on 2017/1/5.
 */
const tls = require('tls');
const fs = require('fs');
const serverHost='10.96.54.24';
//const serverHost='127.0.0.1';
const serverPort=8888;
const options = {
    ca: [ fs.readFileSync('ca.crt') ],
    checkServerIdentity: function (host, cert) {
        return undefined;
    }
};
let index=0;
var tlsSocket = tls.connect({host:serverHost,port:serverPort}, options, () => {
    console.log(`tls client has connected to host ${serverHost} , port ${serverPort}`);
    setInterval(()=>{
        tlsSocket.write(`i love u ${index++}`);
    },3000);
});
tlsSocket.on('error',(e)=>{console.log(e)});