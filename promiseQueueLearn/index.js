/**
 * Created by czzou on 2017/2/22.
 */
const Queue=require('promise-queue');
let request=require('request');
request = request.defaults({jar: true})
function createPromiseFn (res) {
    return function (data){
        let promise=new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("run promise start   ",res);
                request({
                    url:"http://wh.lianjia.com/xiaoqu/jiangan/",

                },function(err,response,body){
                    console.log("run promise done",body);
                    resolve(body);
                });

            },3000);

        })
        return promise;
    }
}

let queue=new Queue(1,Infinity);

queue.add(createPromiseFn(1));
queue.add(createPromiseFn(2))
queue.add(createPromiseFn(3));
queue.add(createPromiseFn(4)).then(()=>{
    console.log(" all done ")
})