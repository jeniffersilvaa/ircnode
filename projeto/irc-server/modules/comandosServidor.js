var fs = require('fs');

function Commands(server) {
    this.server = server;
}

Commands.prototype = {
    PING: function (user) {
        user.write("PONG");
    },
    MOTD: function (user) {
        var texto = fs.readFileSync('../files/motd', {encoding: 'utf8'}, function (erro, dados) {
            if (erro) {
                console.log("Ocorreu um erro na leitura do arquivo '../files/motd'!");
            }
        });
        user.write(texto);
    },
    VERSION: function (user) {
        user.write("Versão: this.server.version");
    },
    TIME: function (user) {
        var date = new Date();
        user.write(date.getUTCDay() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() + " " + date.getUTCHours() + ":" + date.getUTCMinutes());
    },
    LUSERS: function (user) {
        user.write("Exitem " + this.server.connectionsCount + " usuários online no servidor.");
    },
    STATS: function (user) {
        user.write("Faltam parâmetros!");
    }/*,
    STATS: function (user) {
        var param = this.server.command;
    }*/


};

module.exports = Commands;