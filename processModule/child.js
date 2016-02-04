/**
 * Created by czzou on 2016/2/4.
 */
process.on('message', function(m) {
    console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });