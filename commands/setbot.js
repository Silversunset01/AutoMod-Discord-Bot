exports.run = (client, msg, args, content, cooldown, command, Discord, config, request) => {
    var req = args[0];
    if (!msg.member.roles.find("name","Admin")) {
        msg.channel.send("You do not have permission for this command").catch(console.error);
    } else  if (!args[0]){
        msg.channel.send("The sytax for this command is\n `.botgame [playing | listening | watching] [text]`")
    } else {
        var acType = args[0].toLowerCase();
        var activity = args.splice(1, args.length - 1).join(" ");
        switch(acType) {
            case "playing": var gtype = "Playing"; break;
            case "listening": var gtype = "Listening to"; break;
            case "watching": var gtype = "Watching"; break;
            default: msg.channel.send("Please input a valid type: playing | listening to | watching").catch(console.error); break;
        };
        //client.user.setActivity("you sleep", {type: 'WATCHING'})
        client.user.setActivity(activity, {type: acType.toUpperCase()})
        .then(presence => console.log(`Activity set to ${client.user.presence.game.type}`))
        .catch(console.error);
        msg.channel.send(`Bot set to **${gtype} ${activity}**`)
    } 
};

exports.help = {
    name: "setbot",
    category: "Admin",
    description: "Allows you to change the bots game: `.botgame [playing | listening | watching [text]`.",
    usage: "setbot [type] [arguments]",
    example: "",
    status: "Ready"
};