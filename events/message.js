const config = require("../config.json");

exports.run = (client, message) => {
    //ignore bot messages
    if (message.author.bot) return;

    //chat censoring
    var censorList = config.censoredWords;
    var myMsg = message.content;
    for (c in censorList) {
        if (myMsg.includes(censorList[c])){
            message.delete().catch(console.error);
            message.author.send(`I have deleted your message from ${message.channel}, if you believe this is in error please contact staff.`).catch(console.error);
        }
    };
   
};