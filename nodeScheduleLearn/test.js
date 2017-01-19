/**
 * Created by czzou on 17/1/17.
 */
const nodeSchedule=require('node-schedule');

var j = nodeSchedule.scheduleJob('5 */2 * * * *', function(){
    console.log(new Date(),'The answer to life, the universe, and everything!');
});