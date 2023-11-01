const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const event = context.params.event;
const {guild_id, channel_id, user_id} = event;

// The 'central' voice channel users must join first
/*const voiceChannelId = `1127182092544000053`;



const voiceChannelName = `General`;
//currently set both the strings with equal values you can use this to check if ther
//user has joined by creating a vc on his name and then play the music 
const vccheck = voiceChannelName === `General`;
try {
if (vccheck == true) {
  const channels = await lib.discord.guilds['@0.2.4'].channels.list({
    guild_id: `1127182091914858571`,
  });
const channel = channels.find(
  (channels) => channels.name ===  voiceChannelName
);
*/

await lib.discord.channels['@0.3.2'].update({
  channel_id: `1127182092544000053`, 
  bitrate: 96000, 
});

//}

/*} catch (e) {
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: context.params.event.token,
    content:`failed to change the music Quality, you can only use this command if your in <#930875715031818290>`,
  });
  }*/
  
