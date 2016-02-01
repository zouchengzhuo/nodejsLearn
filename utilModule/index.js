/**
 * Created by czzou on 2016/2/1.
 */
var util=require("util");

/**
 * util.debuglog  使用方法：set NODE_DEBUG=zcztest & node index.js
 */
function t1(){
    var dbl=util.debuglog("zcztest");
    dbl("asdasd");
}

/**
 * util.deprecate 用来声明一个函数已经废弃
 */
function t2(){
    var obj={text:function(){
        console.log("text")
    }}
    obj.text();
    obj.text=util.deprecate(function(){
        console.log("test");
    },"obj.text is deprecated,use obj.test instead.");
    obj.text();
}

/**
 * util.inspect 以字符串形式输出一个对象的内容
 */
function t3(){
    var obj = { name: 'nate' };
    obj.inspect = function(depth) {
        return '{' + this.name + '}';
    };
    var obj2={a:1,b:"2",c:{}}

    console.log(util.inspect(obj2,{
        colors:true
    }));

    console.log(util.inspect(util,{
        colors:true
    }));
}

/**
 * 原型继承  注意：不继承方法体里边的属性
 */
function t4(){
    function base(){
        this.fa=function(){
            console.log("fa");
        }
    }
    base.prototype.fb=function(){
        console.log("fb");
    }
    function sub(){

    }
    util.inherits(sub,base);
    var obj=new sub();
    console.log(obj.fa,obj.fb());
}

/**
 * util.format 格式化字符串 类似于C#里边的 String.format
 */
function t5(){
    // %s 字符 %d 数字
    console.log(util.format('%s:%s', 'foo'));  // 'foo:%s'

    console.log(util.format('%s:%s', 'foo', 'bar', 'baz', 'bad'));  // 'foo:bar baz' 没有占位符的参数，按照util.inspect方法返回结果拼接

    console.log(util.format(1, 2, 3)); // '1 2 3'
}

t5();