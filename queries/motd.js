exports.print = function (cmd) {
	var texto;
	/*if (typeof cmd != 'undefined' && cmd.length > 1) {
		var s = require('net').Socket();
		s.connect(6667, cmd[1], function() {
			//socket.write("NICK servidorG4\r\n");
			//socket.write("USER servidorG4 * * : servidorG4\r\n");
			//s.write("/motd\r\n");
		});
		s.on('data', function(d){
			console.log(d.toString());
			texto = d.toString();
		});
		s.end();
	} else {*/
		var fs = require('fs');
		texto = fs.readFileSync('./queries/config/motd', {encoding: 'utf8'}, function(erro, dados) {
			if(erro) {
				console.log("Ocorreu um erro na leitura do arquivo './queries/config/motd'!");
			}
		});
	// }
	return texto;	
}
