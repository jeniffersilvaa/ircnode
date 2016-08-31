exports.print = function (cmd) {
    var texto;
    var fs = require('fs');
    texto = fs.readFileSync('./queries/config/version', {encoding: 'utf8'}, function(erro, dados) {
        if(erro) {
            console.log("Ocorreu um erro na leitura do arquivo './queries/config/version'!");
        }
    });
    return texto;
}
