var server = require('net');

var net = server.createServer(function(socket) {
	motdQuery(socket);
	socket.on('message', function (data) {
		socket.write(data);	
	});
});

function motdQuery(socket) {
	var fs = require('fs');
 
	fs.readFile('queries/motd', 'utf8', function(err, contents) {
		if(err) {
			Console.log("Ocorreu um erro na leitura do arquivo queries/motd");	
		}
		socket.write(contents);
	});
	}

net.listen(6667, '127.0.0.1');
