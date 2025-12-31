const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ECONOMIA (fica fora do evento)
let economia = {};

client.on("ready", () => {
  console.log("Bot online!");
});

// COMANDOS
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const id = message.author.id;

  // !hi
  if (message.content === "!hi") {
    message.channel.send("Oi 👋");
  }

  // !trabalhar
  if (message.content === "!trabalhar") {
    if (!economia[id]) economia[id] = 0;

    economia[id] += 70;

    message.channel.send(
      `💼 ${message.author} trabalhou e ganhou **70 Zezocoins** 🪙\n💰 Saldo: **${economia[id]} Zezocoins**`
    );
  }

  // !saldo
  if (message.content === "!saldo") {
    const saldo = economia[id] || 0;

    message.channel.send(
      `💰 ${message.author}, você tem **${saldo} Zezocoins** 🪙`
    );
  }
});

client.login(process.env.TOKEN);

