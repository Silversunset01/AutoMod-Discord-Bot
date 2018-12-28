# AutoMod Discord Bot
This bot will handle miscellaeous moderation functions including an antispam filter - users who spam will be banned! It currently uses [Discord Anti-spam](https://github.com/Michael-J-Scofield/discord-anti-spam) code.

To use, rename `config-TEMPLATE.json` to `config.json` and replace all values with the corect information for your bot/server. Then run the bot with `node bot.js` or `forever start bot.js` (to keep it running perpetually)

It also comes with some moderation & other commands:

**Moderator Commands:**
- `.announce [channel] [message]`
    - Sends an announcement (Embed) to the specified channel
- `.ban @user [reason]`
    - Bans the user specified, and logs to the logging channel
- `.prune [user] [#]`
    - Deletes [#] of messages from a channel by a specified user
- `.unban [userid] [reason]`
    - Unbans the user ID specified and logs to bot-logs channel

**Admin Commands:**
- `.delete [#]`
    - Deletes messages from a channel. Currently restricted to the Owner role, and requires the to have the 'Manage Messages' permission.
- `.say [channel] [message]`
    - Speaks as the bot
- `.setbot [type] [arguments]`
    - Allows you to change the bots game: .botgame [playing | listening | watching [text].

**Miscellaneous user commands:**
- `.botinfo`
    - Displays information about AutoMod
- `.help [<category>]`
    - Displays all commands available within this bot.
- `.roleinfo [role name]`
    - Displays information about the entered role, including a list of users.
- `.myinfo [<user ID>]`
    - Displays information relating to the user: name, roles, etc. If a user's ID is specified this will query the user, otherwise the command author will be displayed.

**Owner Commands**
- `.emit <type>`
    - Emits an event for testing
- `.eval [script]`
    - Payload testing; logs variable payload to console for testing reasons.
- `.reload [command]`
    - Reloads the bots command to allow edits to take effect. Currently this is restricted to the owner of the bot
- `.stop`
    - Stops the bot. Currently this is restricted to the owner of the bot.
- `.ts [whatever]`
    - Test Command Pls Ignore