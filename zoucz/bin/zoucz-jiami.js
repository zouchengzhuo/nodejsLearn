#!/usr/bin/env node

const program = require('commander');
const path=require('path');
const fs=require('fs');
const crypto = require('crypto');

program
    .option('-p --password <password>', '加/解密的密码(必选)')
    .option('-o --out [out]', '输出目录名称(可选)')
    .option('-j --jiemi', '使用解密模式(可选)')
    .parse(process.argv);
if(!program.password){
    console.error("请通过`zoucz jiami -p yourpassword`输入加密密码！");
    console.log(program.help());
    return;
}
program.jiemi=!!program.jiemi;
program.out=program.out || (program.jiemi?'__recover_output':'__jiami_output');

let password=program.password;
let outputPath=program.out;

if(program.args.length>0){
    program.args.forEach((fileName)=>{
        try{
            Jiami('./',outputPath,fileName);
        }
        catch(e){
            console.log(`加密${fileName}出错：${e.message}`);
        }
    });
}
else{
    readAndJiami('./',outputPath);
}


function readAndJiami(inputPath,outputPath){
    fs.mkdirSync(outputPath);
    let files=fs.readdirSync(inputPath);
    files.forEach((fileName)=>{
        //输出目录的文件不可加密
        if(path.resolve(inputPath,fileName)===path.resolve(outputPath)) return;
        let fileInfo=fs.statSync(fileName);
        if(fileInfo.isFile()){
            Jiami(inputPath,outputPath,fileName);
        }
        else{
            let childInputPath=path.resolve(inputPath,fileName);
            let childOutputPath=path.resolve(outputPath,fileName);
            readAndJiami(childInputPath,childOutputPath);
        }
    });
}

function Jiami(inputPath,outputPath,fileName){
    let fromPath=path.resolve(inputPath,fileName);
    let toPath=path.resolve(outputPath,fileName);
    //加密并存储
    console.log('【processing】',fromPath,'      【saving it to】',toPath);
    let cipher;
    if(program.jiemi){
        cipher = crypto.createDecipher('aes192', password);
    }
    else{
        cipher = crypto.createCipher('aes192', password);
    }

    let input = fs.createReadStream(fromPath);
    let output= fs.createWriteStream(toPath);
    input.pipe(cipher).pipe(output);
}