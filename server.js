var server = require('net');

var net = server.createServer(function(socket) {
	var motd = require('./queries/motd');
	socket.write(motd.print());
	socket.on('data', function (data) {
        	switch(data.toString().trim()) {
			case "motd" : socket.write(motd.print());
		}
    	});
});

net.listen(6667, '127.0.0.1');
