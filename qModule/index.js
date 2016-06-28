/**
 * Created by czzou on 2016/2/25.
 */
var Q=require("q");
/**
 * 1.throw 会终止传递
 * 2.某一步骤中的promise有reject未处理，会终止传递
 * 3.其他情况会将return的值传入下一个then
 */


function t1(){
    function test(){
        var dfd= Q.defer();
        process.nextTick(function(){
            dfd.resolve(1);
        });
        return dfd.promise;
    }
    test().then(function(){
        console.log(arguments);
        throw "asdasderror"
        //return 2;
    }).then(function(){
        console.log(arguments)
        return 3;
    }).then(function(){
        console.log(arguments)
    }).catch(function(){
        console.log(arguments)
    }).done();

}

/**
 * reject如果不处理，会报错
 */
function t2(){
    function test(){
        var dfd= Q.defer();
        process.nextTick(function(){
            dfd.resolve(1);
        });
        return dfd.promise;
    }
    function test2(){
        var dfd= Q.defer();
        process.nextTick(function(){
            dfd.reject(9999);
        });
        return dfd.promise;
    }
    test().then(function(){
        console.log(arguments);
        return 2;
    }).then(function(){
        console.log(arguments)
        return test2();
    }).then(function(){
        console.log(arguments)
        return 3;
    },function(){
        console.log(arguments)
        return 3;
    }).then(function(){
        console.log(arguments)
        return 4;
    }).catch(function(){
        console.log("err",arguments)
    }).done();

}
t1();