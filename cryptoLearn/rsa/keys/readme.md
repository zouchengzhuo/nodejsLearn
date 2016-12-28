### CA认证模拟
#### 1 创建一个CA机构
创建CA机构私钥：`openssl genrsa -out ca.key 2048`
创建CA根证书：
CA机构自己给自己签名认证，即可得到CA机构的根证书
①创建证书认证请求:`openssl req -new -key ca.key -out ca.csr`     
创建过程中会要求输入一些证书的基本信息，如：
```
Country Name (2 letter code) [AU]: GB
State or Province Name (full name) [Some-State]: Yorks
Locality Name (eg, city) []: York
Organization Name (eg, company) [Internet Widgits Pty Ltd]: MyCompany Ltd
Organizational Unit Name (eg, section) []: ICT
Common Name (eg, YOUR name) []: www.networking4all.com
Email Address []:
```
openssl根据认证请求文件和用户输入的其他信息来生成证书文件，从证书文件中可以提取出公钥和输入的那些附加信息
② 自签名：`openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt`    
这样就得到了根证书
#### 2 服务商生成自己的RSA密钥对
生成私钥：`openssl genrsa -out private.key 2048`
根据私钥生成公钥：`openssl rsa -in private.key -pubout -out public.pem`
创建证书认证请求文件：`openssl req -new -key private.key -out request.csr`    
输入其他的附加信息，创建认证请求完毕之后，服务商应该把request.csr发送给CA机构去签名
#### 3 使用刚刚创建的CA机构来为服务商签名证书
就和刚刚给CA机构自己签名一样，可以这样来为服务商的证书签名：    
`openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in request.csr -out server.crt`    
使用命令：    
`openssl x509 -outform PEM -in server.crt -pubkey` 可以从刚刚颁发的证书里边看到公钥信息。

#### 4 创建一个https的服务测试
创建一个https的服务，使用刚刚自己给自己颁发的证书测试：    
```javascript
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
```
![](D:\zoucz\nw_blog_creator/../source/blogimgs/2016-12-28/1482922891210.png)
显示这是一个不受信任的https地址，因为这个CA机构是我们自创的，而不是那几家强大到足够把自己的根证书内置到浏览器里边的~
![](D:\zoucz\nw_blog_creator/../source/blogimgs/2016-12-28/1482922965507.png)
可以看到我们自己的证书信息。