var server = require('net');

var net = server.createServer(function(socket) {
	console.log(motdQ);
	socket.write('');
	socket.pipe(socket);
});

var motdQ = function motdQuery() {
	var fs = require('fs');
 
	fs.readFile('queries/motd', 'utf8', function(err, contents) {
		return contents;
	});
	}

net.listen(6667, '127.0.0.1');
