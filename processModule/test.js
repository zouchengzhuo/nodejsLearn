/**
 * Created by czzou on 2017/3/17.
 */
const fs=require("fs");
const stream=fs.createWriteStream("tttt");

var out=process.stdout;
out.write("xxx");
stream.write("xxx2")
process.stdin.pipe(stream);

console.log("asdasdas");