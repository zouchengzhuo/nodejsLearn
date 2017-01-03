/**
 * Created by czzou on 2017/1/3.
 */
const crypto = require('crypto');
const fs = require('fs');
//const cipher = crypto.createCipher('aes192', 'password');

let beforePath='./before';
let afterPath='./after';

let files=fs.readdirSync(beforePath);

files.forEach((fileName)=>{
    console.log('processing:',fileName);
    let cipher = crypto.createCipher('aes192', 'password');
    let input = fs.createReadStream(`${beforePath}/${fileName}`);
    let output= fs.createWriteStream(`${afterPath}/${fileName}`);
    input.pipe(cipher).pipe(output);
});