var server = require('./conexao');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
var net = require('net');

rl.setPrompt('IRC> ');
rl.prompt();

/* Dados para acesso. Servidor no final do codigo  */
var nickname = "Teste_Pedro";
var realname = "Pedro";
var version = "Custom 1.0";

var Server = function (address, port, socket) {
    this._address = address;
    this._port = port;
    this._socket  = socket;
};

Server.prototype.send = function(message) {
	if (message[0]=="/") {
		var data = message.slice(1).split(" ")
		if (data[0] == "msg") {
			var msg = "PRIVMSG "+data[1]+" :";
			var corpo = message.substr(5);
			msg += corpo.replace(data[1]+" ","");
			console.log("Mensagem enviada.");
			this._socket.write(msg+"\r\n");
		} else {
			var msg = message.slice(1, message.length);
			console.log("sending:"+msg);
			this._socket.write(msg+"\r\n");
		}
	};
}
Server.prototype.connect = function () {
    console.log('Connecting to IRC server: ' + this._address + " on port " + this._port);
    server.connect(this, nickname, realname, function(socket, msg) {
	if(!socket) {
		console.log("socket null");
		return;
	}
	if (msg) {
		console.log(msg.toString('utf8'));
	}	
    });     

};


var s1 = new Server("chat.freenode.net", 6667, null);
s1.connect();

	/* Linha de comando no console */

	rl.on('line', (line) => {
		var input = line.trim();
		s1.send(line);
  	rl.prompt();
});


