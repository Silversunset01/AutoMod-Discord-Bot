exports.run = (client, message) => {
    //ignore bot messages
    if (message.author.bot) return;

    //delete discord guild links
    if (message.content.includes("https://discord.gg/")){
        message.delete().catch(console.error);
        message.author.send(`I have deleted your link from ${message.channel}, if you believe this is in error please contact staff.`).catch(console.error);
    };

    //chat censoring
    var censorList = ["nigga", "nigger"];
    var myMsg = message.content;
    for (c in censorList) {
        if (myMsg.includes(censorList[c])){
            message.delete().catch(console.error);
        }
    };
   
};