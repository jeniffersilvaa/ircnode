var server = require('./conexao');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
var net = require('net');

rl.setPrompt('IRC> ');
rl.prompt();

/* Dados para acesso. Servidor no final do codigo  */
var nickname = "Caio_SI";
var realname = "Caio Barros";
var version = "Custom 1.0";

var Server = function (address, port, socket) {
    this._address = address;
    this._port = port;
    this._socket  = socket;
};

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

Server.prototype.send = function(message) {
	 if (message[0]!="/"){
	console.log("Não é um comando válido");
		}

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
			
	switch (data[0]) {
    case "join":
	console.log("Entrando no canal solicitado ");
	wait(2000);
        break;

    case "part":
        console.log("Saindo no canal solicitado ");
        wait(2000);
        break;
    case "partall":
        console.log("Saindo de todos os canais ");
        wait(2000);
        break;
    case "mode":
        console.log("Permissões ao usuário solicitado foram alteradas ");
        wait(2000);
        break;
    case "topic":
        console.log("Assunto do canal modificado ");
        wait(2000);
        break;




	default:
        wait(1000);
}

	/*		console.log("Enviando o comando: "+msg); */
			this._socket.write(msg+"\r\n");
}
}
	};
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


var s1 = new Server("irc.freenode.com", 6667, null);
s1.connect();

	/* Linha de comando no console */

	rl.on('line', (line) => {
		var input = line.trim();
		s1.send(line);
  	rl.prompt();
});


