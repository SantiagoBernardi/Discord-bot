require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// 👇 Reemplazá con tus URLs directas
const foreheadKissImages = [
  // Ejemplos (reemplazar):
  "https://cdn.discordapp.com/attachments/.../beso1.gif",
  "https://i.imgur.com/abc123.gif",
  "https://raw.githubusercontent.com/tu-usuario/tu-repo/main/img/beso2.png"
];

// Utilidad para elegir random
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

client.once('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();

  if (content.startsWith('!foreheadkiss') || content.startsWith('!besofrente')) {
    const target = message.mentions.users.first();
    const randomImage = pickRandom(foreheadKissImages);

    const texto = target
      ? `<@${message.author.id}> dio un beso en la frente a <@${target.id}> 💕`
      : `${message.author} dio un beso en la frente 💕`;

    try {
      await message.channel.send({
        content: texto,
        files: [randomImage], // adjunta la imagen por URL
      });
    } catch (err) {
      console.error('Error enviando imagen:', err);
      await message.channel.send('Ups, no pude enviar la imagen. Probá de nuevo más tarde 🙏');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
