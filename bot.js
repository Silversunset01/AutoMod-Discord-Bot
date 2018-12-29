const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const request = require("axios");

const config = require("./config.json");
const prefix = config.prefix;

let cooldown = new Set();

const antispam = require("discord-anti-spam");
 
antispam(client, {
  logChannel: config.banLogChannel,
  warnBuffer: config.warnBuffer, 
  maxBuffer: config.warnBuffer,
  interval: config.interval, 
  warningMessage: config.warningMessage, 
  banMessage: config.banMessage, 
  maxDuplicatesWarning: config.maxDuplicatesWarning,
  maxDuplicatesWarning: config.maxDuplicatesWarning,
  maxDuplicatesBan: config.maxDuplicatesBan, 
  deleteMessagesAfterBanForPastDays: parseInt(config.deleteMessagesAfterBanForPastDays), 
  exemptRoles: config.exemptRoles, 
  exemptUsers: config.exemptUsers 
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("error", (e) => {
    console.error(e);
    client.channels.find("id", config.errorLogChannel).send("**Error:** ```" + e + "```");
  }
);

client.on("warn", (e) => {
    console.warn(e);
    client.channels.find("id", config.errorLogChannel).send("**Warning:** ```" + e + "```");
  }
);

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
