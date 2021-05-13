
require('dotenv').config();
const Discord = require('discord.js');

const Client = new Discord.Client();

Client.on('message', async (msg) => {
    if (msg.content === 'ping') {
        msg.reply('pong');
      }
  });


Client.login(process.env.discordToken);