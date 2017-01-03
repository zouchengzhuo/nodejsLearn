/**
 * Created by czzou on 2017/1/3.
 */
const crypto = require('crypto');
const fs = require('fs');
const path=require('path');

let recoverPath='./recover';
let afterPath='./after';

let files=fs.readdirSync(afterPath);
let files2=fs.statSync(afterPath);

files.forEach((fileName)=>{
    console.log('processing:',fileName);
    let decipher = crypto.createDecipher('aes192', 'password');
    let input = fs.createReadStream(`${afterPath}/${fileName}`);
    let output= fs.createWriteStream(`${recoverPath}/${fileName}`);
    input.pipe(decipher).pipe(output);
});