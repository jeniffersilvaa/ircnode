/*Instanciando o servdor e demais variáveis necessáras */
var server = require('./conexao');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
var net = require('net');

/*Prompt de comando para a aplicação*/
rl.setPrompt('IRC> ');
rl.prompt();

/* Dados para acesso. Servidor no final do codigo  */
var nickname = "Caio_SI";
var realname = "Caio Barros";
var version = "Custom 1.0";

/*Função server */
var Server = function (address, port, socket) {
    this._address = address;
    this._port = port;
    this._socket  = socket;
};

/*Função para espera em milesegundos*/ 
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

/*Interpretador de comandos*/
Server.prototype.send = function(message) {

/*Caso não comece com '/' não será interpretado como comando, o que é inálido*/
	 if (message[0]!="/" || message[0] != "\u23CE"){
	console.log("Não é um comando válido");
		}
/*Caso seja '/' verifica se é mensagem e faz o devido tratamento para envio*/
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
i
/*Caso seja algum comando do canal, faz o devido tratamento e envia para o console o que está sendo feito e aguarda 2 segundos antes de enviar o comando para o servidr.*/			
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
    case "names":
        console.log("Exibindo quem está no canal ");
        wait(2000);
        break;
    case "list":
        console.log("Lista dos canais disponíveis ");
        wait(2000);
        break;
    case "invite":
        console.log("Convidando usuário ");
        wait(2000);
        break;
    case "kick":
        console.log("Kickando usuário da sala ");
        wait(2000);
        break;
}

	/*Envia o comando para o servidor */
	this._socket.write(msg+"\r\n");
}
}
	};

/*Envia mensagens ao console caso algo der errado e configura como UTF8 o padrão de IO*/
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

/*Endereço do servidor*/
var s1 = new Server("irc.freenode.com", 6667, null);

/*Conecta no servidor*/
s1.connect();

/* Linha de comando no console */
	rl.on('line', (line) => {
		var input = line.trim();
		s1.send(line);
  	rl.prompt();
});


