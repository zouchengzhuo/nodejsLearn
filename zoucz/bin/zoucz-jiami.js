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
let promiseInfoArr=[];


if(program.args.length>0){
    program.args.forEach((fileName)=>{
        try{
            CreateJiamiTask('./',outputPath,fileName);
        }
        catch(e){
            console.log(`加密${fileName}出错：${e.message}`);
        }
    });
}
else{
    readAllAndJiami('./',outputPath);
}
doJiamiWork();

function doJiamiWork(){
    let promise=new Promise((resolve,reject)=>{
        let tasks=promiseInfoArr.splice(0,10);
        let taskPromiseArr=[];
        if(tasks.length==0){
            reject(new Error("done"));
            return;
        }
        tasks.forEach(function(task){
            let taskPromise=new Promise(function (resolve,reject){
                let cipher=null;
                if(program.jiemi){
                    cipher = crypto.createDecipher('aes192', password);
                }
                else{
                    cipher = crypto.createCipher('aes192', password);
                }
                let input = fs.createReadStream(task.fromPath);
                let output= fs.createWriteStream(task.toPath);
                input.pipe(cipher).pipe(output);
                console.log('【processing】',task.fromPath,'      【saving it to】',task.toPath);
                output.on('finish', () => {
                    resolve();
                });
            });
            taskPromiseArr.push(taskPromise);
        });
        Promise.all(taskPromiseArr).then(doJiamiWork).catch((e)=>{
            if(e.message==="done"){
                console.log("任务处理完毕！");
            }
            else{
                console.log(e);
            }
        });

    });
    return promise;
}

function readAllAndJiami(inputPath,outputPath){
    fs.mkdirSync(outputPath);
    let files=fs.readdirSync(inputPath);
    files.forEach((fileName)=>{
        //输出目录的文件不可加密
        if(path.resolve(inputPath,fileName)===path.resolve(outputPath)) return;
        let fileInfo=fs.statSync(path.resolve(inputPath,fileName));
        if(fileInfo.isFile()){
            CreateJiamiTask(inputPath,outputPath,fileName);
        }
        else{
            let childInputPath=path.resolve(inputPath,fileName);
            let childOutputPath=path.resolve(outputPath,fileName);
            readAllAndJiami(childInputPath,childOutputPath);
        }
    });
}

function CreateJiamiTask(inputPath,outputPath,fileName){
    let fromPath=path.resolve(inputPath,fileName);
    let toPath=path.resolve(outputPath,fileName);
    promiseInfoArr.push({
        fromPath:fromPath,
        toPath:toPath
    });
}
