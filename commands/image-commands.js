const config = require("../config.json");
const pfx = config.prefix;
const categories = require("./_CATEGORIES.js");
const Discord = require("discord.js");
const minecarft = require("./ImageCommands/minecraft");

const ImageCmdHelp = [{
  name: "Minecraft Achievement",
  description: `Make custom Minecraft achievement.\n\`${pfx}image minecraft {description}\``
}]

module.exports = {
  command: "image",
  category: categories.fun,
  help_name: `:camera: Photo Commands`,
  help_description: `Run photo commands to make custom photos.\n\`${pfx}image help\``,

  execute(client, message, args) {
    if (args.length === 0) {
      return message.channel.send(`Didn't provide any image type run \`${pfx}image help\` for image commands.`)
    }
    if (args[0] === "help") {
      var embed = new Discord.MessageEmbed()
        .setTitle("Image Commands")
        .setColor("#0000FF");
      for (var number in ImageCmdHelp) {
        embed.addField(ImageCmdHelp[number].name, ImageCmdHelp[number].description, true);
      }
      return message.channel.send(embed);
    }
    switch (args[0].toLowerCase()) {
      case 'minecraft':
        require('./ImageCommands/minecraft').minecraft(client, message, args);
        break;
      case 'meme':
        require('./ImageCommands/meme').meme(client, message, args);
        break;
    }
  }
}
