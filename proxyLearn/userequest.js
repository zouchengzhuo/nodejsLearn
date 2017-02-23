/**
 * Created by czzou on 2017/2/22.
 */
var request = require('request');
request({'url':'https://www.baidu.com',
    'proxy':'http://27.44.165.41:9999'}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
})