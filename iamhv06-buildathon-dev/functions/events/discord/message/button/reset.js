const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let ch_id = `1168843865533456384`;
let server_id = `1127182091914858571`;
 let msg_id = `1168901039320203374`;
let voice_ch_id = `1127182092544000053`;
 
await lib.discord.channels['@0.3.4'].messages.update({
  message_id: msg_id, // required
channel_id: ch_id,
content: '**Queue**',
tts: false,
embeds: [
  {
    type: 'rich',
    title: `Music Player`,
    description: `Just type the name of your favorite song and enjoy listening to it`,
    color: 0x00ffff,
    image: {
      url: ``,
      height: 0,
      width: 0,
    },
    thumbnail: {
      url: `https://cdn.discordapp.com/attachments/1041720125608443944/1123648743959441460/avatars-xMRtQtC8AhlBNTUV-MXkWMg-t240x240.png`,
    }
  },
],
components: [
{
  type: 1,
  components: [
    {
     style: 1,
     label: `Reset`,
     custom_id: `res`,
     disabled: false,
     type: 2,
    },    
       ]
     }
 ],
 });