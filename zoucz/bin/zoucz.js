#!/usr/bin/env node
const program = require('commander');
const package = require('../package.json');

program
    .version(`zoucz_v${package.version}`)
    .command('jiami [filename]', '加/解密名称为filename的文件,不填写则加/解密当前目录所有文件')
    .parse(process.argv);


