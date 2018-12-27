const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const request = require("axios");

const config = require("./config.json");
const prefix = config.prefix;

let cooldown = new Set();

const antispam = require("discord-anti-spam");
 
antispam(client, {
  warnBuffer: 5, //Maximum amount of messages allowed to send in the interval time before getting warned.
  maxBuffer: 10, // Maximum amount of messages allowed to send in the interval time before getting banned.
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
  warningMessage: "stop spamming or you will be banned.", // Warning message send to the user indicating they are going to fast.
  banMessage: "has been banned for spamming.", // Ban message, always tags the banned user in front of it.
  maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
  maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  deleteMessagesAfterBanForPastDays: 7, // Delete the spammed messages after banning for the past x days.
  exemptRoles: ["Admin", "Moderator"], // The names of the roles which should not be spam-filtered
  exemptUsers: ["Silversunset#9967", "TheRandomnatrix#8857"] // The Discord tags of the users who should not be spam-filtered
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(config.prefix) !== 0) return;
  if (msg.content.includes("/")) return;

  //parse commands
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const content = msg.content.substr(prefix.length + command.length,msg.content.length - prefix.length - command.length);

  //perform actions
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, msg, args, content, cooldown, command, Discord, config, request);
  } catch (err) {
    console.error(err);
  }

});

client.login(config.token);
