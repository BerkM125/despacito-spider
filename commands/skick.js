const config = require("../config.json");
const pfx = config.prefix;
const categories = require("./_CATEGORIES.js");
const Discord = require('discord.js');

module.exports = {
  command: "skick",
  category: categories.moderation,
  help_name: `:leg: Silent kick`,
  help_description: `Used to silently kick members.\n\`${pfx}kick {mention | username#discriminator} {optional: reason}\``,

  execute(client, message, args) {
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.author.send("You do not have the permission to kick members.");
      return;
    }

    let target_user = message.mentions.users.first();
    if (!target_user) {
      let matching_users = client.users.cache.filter(user => user.username === args[0].split("#")[0]);
      target_user = matching_users.find(user => user.discriminator === args[0].split("#")[1]);
      if (!target_user) {
        message.author.send('Member to kick not found.');
        return;
      }
    }

    args.shift();

    const reason = args.length > 0 ? args.join(" ") : "None";
    if (!message.guild.member(target_user).kickable) {
      message.author.send("I am unable to kick the user because of missing permissions.");
      return;
    }

    const logMsg = new Discord.MessageEmbed()
      .setTitle(`*You yeeted ${target_user.username} out the window*`)
      .setColor(0x0099ff)
      .addField("User kicked", `<@${target_user.id}>`)
      .addField("Time", message.createdAt)
      .addField("Reason", reason);

    const uGotKicked = new Discord.MessageEmbed()
      .setTitle(`You got yeeted from \`${message.guild.name}\``)
      .setColor(0x0099ff)
      .addField("Time", message.createdAt)
      .addField("Reason", reason);

    message.author.send(logMsg).catch(err => {});
    target_user.send(uGotKicked).catch(err => {});

    message.guild.member(target_user).kick({
      reason: reason
    }).catch(err => message.author.send(`Error kicking user: ${err.message}`));
  }
}
