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
    linksCount: 0,
    connectCount: 0,
    traceCount: 0,
    adminCount: 0,
    infoCount: 0,

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
        user.write("Versão: " + this.server.version);
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
            user.write("Contagem de uso de comandos disponíveis no servidor: \nPING: "
                        + this.pingCount + "\nMOTD: " + this.motdCount + "\nVERSION: "
                        + this.versionCount + "\nTIME: " + this.timeCount + "\nLUSERS: "
                        + this.lusersCount + "\nSTATS: " + this.statsCount + "\nLINKS: "
                        + this.linksCount + "\nCONNECT: " + this.connectCount + "\nTRACE: "
                        + this.traceCount + "\nADMIN: " + this.adminCount + "INFO: "
                        + this.infoCount);
        } else if (args === "-O") {
            var texto = fs.readFileSync('../files/operators', {encoding: 'utf8'}, function (erro, dados) {
                if (erro) {
                    console.log("Ocorreu um erro na leitura do arquivo '../files/operators'!");
                }
            });
            user.write("Operadores do servidor:\n" + texto);
        } else if (args === "-U") {
            user.write("Tempo de vida do servidor: " + process.hrtime()[0] + " milissegundos.");
        } else {
            user.write("Parâmetro inválido ou faltam parâmetros!");
        }
        this.statsCount++;
    },
    LINKS: function (user) {
        user.write("Este comando está indisponível nessa versão.");
        this.linksCount++;
    },
    CONNECT: function (user) {
        user.write("Este comando está indisponível nessa versão.");
        this.connectCount++;
    },
    TRACE: function (user) {
        user.write("Este comando está indisponível nessa versão.");
        this.traceCount++;
    },
    ADMIN: function (user) {
        user.write("Administrador do servidor: Marcelo Akira Inuzuka");
        this.adminCount++;
    },
    INFO: function (user) {
        user.write("Bem-Vindo ao servidor IRC do Curso de Sistemas de Informação e disciplina Aplicações Distribuidas. " +
            "As consultas ao servidor foram implementadas pelo Grupo 4, abaixo algumas informações sobre o servidor:\n" +
            "Versão: " + this.server.version + "\nNúmero de usuários conectados: "+ this.server.connectionsCount+"\n" +
            "Tempo de vida do servidor: " + process.hrtime() + "\nAdministrador do Servidor: Marcelo Akira Inuzuka");
        this.infoCount++;
    }
};

module.exports = Commands;