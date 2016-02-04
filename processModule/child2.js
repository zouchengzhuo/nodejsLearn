/**
 * Created by czzou on 2016/2/4.
 */
process.on('message', function(m, server) {
    if (m === 'server') {
        server.on('connection', function (socket) {
            socket.end('handled by child');
        });
    }
});