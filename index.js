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
  "https://i.pinimg.com/736x/6e/a6/de/6ea6de6301565f36d9948e3f7ab184be.jpg",
  "https://i.pinimg.com/1200x/5b/43/b5/5b43b5f746947aa19af564ae939baf6f.jpg",
  "https://cdn.discordapp.com/attachments/1411386953365983428/1411387036677439529/animesher.com_shojo-forehead-kiss-578221.png?ex=68b4781b&is=68b3269b&hm=78df344a3ce7471d53c72272f646623dbb5651503128a597202fc40fd9d41351&",
  "https://cdn.discordapp.com/attachments/1411386953365983428/1411387686039851030/tumblr_ffb26778dd58b4d071e19d0dfbfa52e8_8a804e40_1280.png?ex=68b478b6&is=68b32736&hm=9c9fdae8283a741be64897a849c370cc5611374f290d62599f71581296171676&",
  "https://cdn.discordapp.com/attachments/1411386953365983428/1411387696873607330/tumblr_5aa0c6e217b8087e9719b23900b85dbf_fdd0f9bc_1280.png?ex=68b478b9&is=68b32739&hm=43d4380b5a1f48bba8e7698e7cd1f67fcf0738868ef5832bbdb55b5528eeb6f8&",
  "https://cdn.discordapp.com/attachments/1411386953365983428/1411387704478011433/tumblr_8bbd87bd6f2f4e085849e69c60aec245_94ebb563_1280.png?ex=68b478bb&is=68b3273b&hm=ed0fe0d21877a309f5d00af4b9ee2d5a212949843de22b20e07508715ce3f282&",
  "https://cdn.discordapp.com/attachments/1411386953365983428/1411387713931706458/tumblr_47b9a8e4ceb0fbe1e142ca401148ce43_7e61fe31_1280.png?ex=68b478bd&is=68b3273d&hm=1bbd9d689c140cf74bce43ede90570ff1c687b7108c137ab9b6fbe70f348d297&"
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
