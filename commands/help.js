const fs = require("fs");

exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    var req = args[0];
    
    //create command list
    var files = fs.readdirSync('./commands/');
    const commands = [];
    for (i in files) {
        var cmd = files[i];
        commands.push(cmd.replace(".js",""));
    };
    
    //if no category is listed, display generic help text
    if (typeof req === 'undefined') {
        //loop through all commands and create a list of categories
        var catList = [];
        for (i in commands) {
            var cmd = require("../commands/" + commands[i] + ".js");
            if (catList.indexOf(cmd.help.category) < 0) {catList.push(cmd.help.category)}
        };
        var result = "";
        for (var i = 0; i < catList.length; i++){
            result += ("- " + String(catList[i] + "\n"));
        };
        var embed = new Discord.RichEmbed()
            .setColor(0xE8DFEA)
            .setTimestamp()
            .setFooter(".help | " + msg.author.tag)
            .setDescription(`For a list of commands type **.help [category]**. \nThe categories available are: \n${result}`);
            msg.channel.send({embed}).catch(console.error);
    } else {
        //if category is listed, display all commands within
        if (req.toLowerCase() === "owner" && msg.author.id !== config.owner) {
            msg.channel.send("I'm sorry, you do not have permission for this command.").catch(console.error);
        } else {
            //create embed
            var embed = new Discord.RichEmbed()
                .setColor(0xE8DFEA)
                .setTitle(`Command Category: **${req.toUpperCase()}**`)
                .setTimestamp()
                .setFooter(".help | " + msg.author.tag)
                for (y in commands) {
                    var cmd = require("../commands/" + commands[y] + ".js");
                    if(cmd.help.category.toLowerCase() === req.toLowerCase()) {
                        embed.addField(`${config.prefix}${cmd.help.usage}`, `*${cmd.help.description}*`)
                    };
                };
            msg.channel.send({embed}).catch(console.error);
            };
    };
};

exports.help = {
    name: "help",
    category: "Info",
    description: "Displays all commands available within this bot.",
    usage: "help [<category>]",
    example: "",
    status: "Untested"
};