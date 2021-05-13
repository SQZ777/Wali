
require('dotenv').config();
const Discord = require('discord.js');
const Client = new Discord.Client();
const ChannelManager = new Discord.ChannelManager();


const { handleReactionAdd } = require('./discordHandler/messageReactionAdd');

// Client.on('messageReactionAdd', async (reaction, user) => {
//     console.log(reaction);
//     await handleReactionAdd(reaction, user);
// });

Client.on('message', async (message) => {
    if (message.content === 'ping') {
        message.reply('pong');
    }
    const filter = (reaction, user) => {
        console.log(reaction.name);
        console.log(user.username);
        return reaction.emoji.name === '👍' && user.id === message.author.id;
    };
    
    const collector = message.createReactionCollector(filter, { time: 15000 });
    
    collector.on('collect', (reaction, user) => {
        message.reply("收到了一個👍");
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

});

Client.on('ready', async () => {
    await Client.channels.fetch('842413711447818281')
                    .then(channel => channel.messages.fetch().then(message => message));
});

Client.login(process.env.discordToken);