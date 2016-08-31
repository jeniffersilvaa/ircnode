var server = require('net');

var net = server.createServer(function(socket) {
	var motd = require('./queries/motd');
	socket.write(motd.print());
	socket.on('data', function (data) {
			var cmd = data.toString().toUpperCase().trim().split(" ");
        	switch(cmd[0]) {
				case "MOTD" : socket.write(motd.print(cmd));
				break;
				case "TIME" :
					var time = require("./queries/time");
					socket.write(time.print());
				break;
        	}
    	});
});

net.listen(6667, '127.0.0.1');
