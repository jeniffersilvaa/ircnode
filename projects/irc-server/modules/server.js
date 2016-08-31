var net = require('net'),
    carrier = require('carrier'),
    ServerCommands = require('./comandosServidor');


function Server() {
    this.port = 6667;
    this.commands = new ServerCommands(this);
}

Server.initialize = function () {
    var server = new Server();
    server.start();
};

Server.prototype = {
    version: '0.0.1',

    start: function () {
        var server = this;
        this.server = net.createServer(conn);
        this.server.listen(this.port);
        console.log('Servidor escutando em: ' + this.port);

        function conn(client) {
            var carry = carrier.carry(client);
            client.on('error', console.log);
            carry.on('line', function (line) {
                server.data(client, line);
            });
        }
    },

    data: function (client, line) {
        this.send(line, client);
    },

    parseMessage: function (data) {
        var message = data.trim().split(/ :/),
            args = message[0].split(' ');

        message = [message.shift(), message.join(' :')];

        if (message.length > 0) {
            args.push(message[1]);
        }

        if (data.match(/^:/)) {
            args[1] = args.splice(0, 1, args[1]);
            args[1] = (args[1] + '').replace(/^:/, '');
        }

        return {
            command: args[0].toUpperCase(),
            args: args.slice(1)
        };
    },

    send: function (data, client) {
        var message = this.parseMessage(data);
        if (this.findCommand(message.command)) {
            this.commands[message.command].apply(this.commands, [client].concat(message.args));
        }
    },

    findCommand: function (command) {
        return this.commands[command];
    }
};

exports.Server = Server;

if (!module.parent) {
    Server.initialize();
}