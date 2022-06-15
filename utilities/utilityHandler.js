const eventListeners = require("./eventListeners.js");

module.exports.ready = async (client) => {
    console.log("---------------------");
    console.log(`Sucessfully logged in as: ${client.user.tag}`);
    console.log("All services online");
    console.log("---------------------");

    client.user.setStatus("online");
    client.user.setActivity("ANUS DON DEMINA, en sån här bög har inte alla servrar");
}

module.exports.readyEvents = async (client) => {
    eventListeners.registerEvents(client);
}