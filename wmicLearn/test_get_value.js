/**
 * Created by czzou on 2016/12/26.
 */
var wmic = require('wmic');

wmic.get_value('computersystem', 'name', null, function(err, value) {
    console.log(value) // Your Hostname
})

