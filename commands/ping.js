const config = require("../config.json");
const pfx = config.prefix;
const categories = require("./_CATEGORIES.js");

module.exports = {
  command: "ping",
  category: categories.utils,
  help_name: `Ping`,
  help_description: `Gets my latency and API latency.\n\`${pfx}ping\``,

  async execute(client, message, args) {
    // Calculates ping between sending a message and editing it, giving a round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    let m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
}
