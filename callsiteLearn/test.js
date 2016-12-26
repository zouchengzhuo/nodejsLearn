/**
 * Created by czzou on 2016/12/26.
 */
var stack = require('callsite');

foo();

function foo() {
    bar();
}

function bar() {
    baz();
}

function baz() {
    console.log();
    stack().forEach(function(site){
        console.log('  \033[36m%s\033[90m in %s:%d\033[0m'
            , site.getFunctionName() || 'anonymous'
            , site.getFileName()
            , site.getLineNumber());
    });
    console.log();
}