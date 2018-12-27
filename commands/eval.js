exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    if (msg.author.id !== config.owner) {
        msg.channel.send("I'm sorry, only my owner can run this command.").catch(console.error);;
    } else {
        eval(content);
    }
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "eval",
    category: "Owner",
    description: "Payload testing; logs variable payload to console for testing reasons.",
    usage: "eval [script]",
    example: "",
    status: "Broken"
};