/**
 * Created by czzou on 2017/3/6.
 */
function a(){

}

a.a=1;
a.b=function(v){
    a.a=v;
}

module.exports=a;