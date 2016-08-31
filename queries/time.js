exports.print = function () {
    var date = new Date();
    return date.getUTCDate() + "/" + date.getUTCMonth() + "/" + date.getUTCFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
}