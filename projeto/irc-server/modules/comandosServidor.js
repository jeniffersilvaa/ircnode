var fs = require('fs');

function Commands(server, args) {
    this.server = server;
    this.args = args;
}

Commands.prototype = {
    pingCount : 0,
    motdCount: 0,
    versionCount: 0,
    timeCount: 0,
    lusersCount: 0,
    statsCount: 0,

    PING: function (user) {
        user.write("PONG");
        this.pingCount++;
    },
    MOTD: function (user) {
        var texto = fs.readFileSync('../files/motd', {encoding: 'utf8'}, function (erro, dados) {
            if (erro) {
                console.log("Ocorreu um erro na leitura do arquivo '../files/motd'!");
            }
        });
        user.write(texto);
        this.motdCount++;
    },
    VERSION: function (user) {
        user.write("Versão: this.server.version");
        this.versionCount++;
    },
    TIME: function (user) {
        var date = new Date();
        user.write(date.getUTCDay() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() + " " + date.getUTCHours() + ":" + date.getUTCMinutes());
        this.timeCount++;
    },
    LUSERS: function (user) {
        user.write("Exitem " + this.server.connectionsCount + " usuários online no servidor.");
        this.lusersCount++;
    },
    STATS: function (user, args) {
        if (args === "-L") {
            user.write("O número de conexões no servidor é: " + this.server.connectionsCount);
        } else if (args === "-M") {
            user.write("Contagem de uso de comandos disponíveis no servidor: \r\nPING: "
                        + this.pingCount + "\r\nMOTD: " + this.motdCount + "\r\nVERSION: "
                        + this.versionCount + "\r\nTIME: " + this.timeCount + "\r\nLUSERS: "
                        + this.lusersCount + "\r\nSTATS: " + this.statsCount);
        } else if (args === "-O") {
            var texto = fs.readFileSync('../files/operators', {encoding: 'utf8'}, function (erro, dados) {
                if (erro) {
                    console.log("Ocorreu um erro na leitura do arquivo '../files/operators'!");
                }
            });
            user.write("Operadores do servidor:\n" + texto);
        } else if (args === "-U") {
            user.write("Time de vida do servidor: " + process.hrtime()[0] + " milissegundos.");
        } else {
            user.write("Parâmetro inválido ou faltam parâmetros!");
        }
        this.statsCount++;
    }
};

module.exports = Commands;