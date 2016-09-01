var fs = require('fs');

function Commands(server) {
    this.server = server;
}

Commands.prototype = {
    PING: function (user) {
        user.write("PONG");
    },
    MOTD: function (user) {
        var texto = fs.readFileSync('./projeto/irc-server/files/motd', {encoding: 'utf8'}, function (erro, dados) {
            if (erro) {
                console.log("Ocorreu um erro na leitura do arquivo '../files/motd'!");
            }
        });
        user.write(texto);
    }
};

module.exports = Commands;