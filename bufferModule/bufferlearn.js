/**
 * Created by czzou on 2015/12/21.
 */
/**
 * Buffer Init
 */
function t1() {
    var b1=new Buffer(5);
    var b2=new Buffer([1,2,3,4]);
    var b3=new Buffer(b2);
    var b4=new Buffer([2,3,4,5]);
    var b5=new Buffer("abc");
}

/**
 * sort&compare
 */
function t2(){
    var arr=[b4,b2];
    arr.sort(Buffer.compare);
    var test=1;
}

/**
 * btyelength
 */
function t3(){
    var str="\u1234\u4567\u7891";
    console.log("str length:",str.length,"   bytelength:",Buffer.byteLength(str,"utf8"));
}

/**
 * fill
 */
function t4(){
    var b1=new Buffer(50),b2=new Buffer(50),b3=new Buffer(50);
    b1.fill("h");
    b2.fill("h",5,10)
    debugger;
}

/**
 * indexOf
 */
function t5(){
    var b=new Buffer(50);
    b.fill("abc",8,11);
    var i1= b.indexOf("ab");
    var i2= b.indexOf("ab",7);
    debugger;
}


t5();