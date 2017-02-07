/**
 * Created by czzou on 2017/2/7.
 */
const nodeMailer=require('nodemailer');

let smtpConfig = {
    host: 'smtp.163.com',
    port: 25,
    secure: false,
    auth: {
        user: 'zouchengzhuo@163.com',
        pass: 'your password'
    }
};
let transporter = nodeMailer.createTransport(smtpConfig);
var mailOptions ={
    from:'zoucz<zouchengzhuo@163.com>',
    to:'zoucz<405966530@qq.com>',
    subject:'测试SMTP发送邮件',
    text: 'email text content',
    html: '<h1>Hello SMTP protocol</h1>'
};
transporter.sendMail(mailOptions,function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: '+ info.response);
});