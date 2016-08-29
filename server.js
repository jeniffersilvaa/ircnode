var server = require('net');

var net = server.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

net.listen(6667, '127.0.0.1');
