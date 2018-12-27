const config = require("../config.json");
exports.run = (client, msg, args, content, cooldown, command, Discord, request) => {
    //variables
    var emitType = args[0];
        
    if (msg.author.id !== config.owner) {
        msg.channel.send("I'm sorry, you do not have permission for this command").catch(console.error);
    } else if (typeof emitType == 'undefined') {
		var emitReq = "nothing";
	} else {
		var emitReq = emitType.toUpperCase();
	};

	switch(emitReq) {
		case "MEMBERJOIN": 
			client.emit("guildMemberAdd", msg.member); 
			msg.channel.send("I have emitted `guildMemberAdd`"); 
			break;
		case "MEMBERLEAVE":
			client.emit("guildMemberRemove", msg.member); 
			msg.channel.send("I have emitted `guildMemberRemove`"); 
			break;
		case "BAN": 
			client.emit("guildBanAdd", msg.guild, msg.author); 
			msg.channel.send("I have emitted `guildBanAdd`"); 
			break;
		case "UNBAN": 
			client.emit("guildBanRemove", msg.guild, msg.author); 
			msg.channel.send("I have emitted `guildBanRemove`"); 
			break;
		case "ERROR": 
			msg.channel.send("I have emitted `error` - please check your log for details");
			client.emit("error", "This is a test error"); 
			break;
		default: 
			msg.channel.send("The syntax for this command is `?emit <type>` \n\n**The types you can choose from are:** \n`memberjoin` - emitted when a member joins the guild \n`memberleave` - emitted when a member leaves the guild (either willingly or via kick) \n`ban` - emitted when a member is banned \n`unban` - emitted when a member is banned \n`error` - throws an uncaught error");
			break;
		};
};

//for !help command (mandatory or the bot will error!)
exports.help = {
    name: "emit",
    category: "Owner",
    description: "Emits an event for testing",
    usage: "emit <type>",
    example: "",
    status: "Ready"
};