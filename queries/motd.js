exports.print = function () {
		var fs = require('fs');
		var texto = fs.readFileSync('./queries/config/motd', {encoding: 'utf8'}, function(erro, dados) {
			if(erro) {
				console.log("Ocorreu um erro na leitura do arquivo './queries/config/motd'!");	
			}
		});
	return texto;	
}
