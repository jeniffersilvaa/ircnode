var net = require('net');


exports.connect = function (server, nickname, realname, callback) {

    var socket = new net.Socket();
    var msg = null;
    socket.connect(server._port, server._address, function () {
        socket.write("NICK " + nickname + "\r\n");
        socket.write("USER " + nickname + " * * :" + realname + "\r\n");
        server._socket = socket;
        callback(socket);
    });

    socket.on('error', function (err) {
        console.log("encountered Error: " + err.message);
        return;
    });

    socket.on('data', function (data) {
        if (data.slice(0, 4) == "PING") {
            console.log('Received: ' + data);
            var reply = "PONG " + data.slice(5);
            console.log("replying with " + reply);
            socket.write(reply);

        } else {
            callback(socket, data);
        }
    });

    socket.on('close', function () {
        console.log('Connection closed');
    });
};

