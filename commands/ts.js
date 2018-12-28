const config = require("../config.json");

exports.run = (client, msg, args, content, cooldown, command, Discord, request) => {
    if (msg.author.id !== config.owner) {
        msg.channel.send("I'm sorry, only my owner can run this command.").catch(console.error);
    } else {
        msg.channel.send("What were you expecting...its a test command....").catch(console.log);
    }

};

exports.help = {
    name: "ts",
    category: "Owner",
    description: "Test Command Pls Ignore",
    usage: "ts [whatever]",
    example: "",
    status: "Untested"
};