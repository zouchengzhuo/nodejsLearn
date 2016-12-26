/**
 * Created by czzou on 2016/12/26.
 */
var wmic = require('wmic');
var util=require('util');
wmic.get_values('cpu', 'NumberOfCores, NumberOfLogicalProcessors', null, function(err, result) {
    if (err) {
        cb(new Error('exec wmic failed'));
        return;
    }

   console.log(util.inspect(result));
});
wmic.get_values('logicaldisk', 'name, volumename', null, function(err, values) {
    console.dir(values) // An array of disks
})