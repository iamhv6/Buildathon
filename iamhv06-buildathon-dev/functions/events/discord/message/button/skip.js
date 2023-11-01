const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytdl = require('ytdl-core');
const yts = require('yt-search');

let ch_id = `1168843865533456384`;
let server_id = `1127182091914858571`;
 let msg_id = `1168901039320203374`;
let voice_ch_id = `1127182092544000053`;
 


let txt = await lib.discord.channels['@0.3.4'].messages.retrieve({
  message_id: msg_id,
  channel_id: ch_id,
});
let pre = txt.content;
 let re = /\s*(?:\n|$)\s*/;
 let rex = txt.content.split(re)[1];
 let searchString = rex;
try {
  let youtubeLink;
  if (!searchString.includes('youtube.com')) {
    let results = await yts(searchString);
    if (!results?.all?.length) {
      throw new Error('No results found for your search string. Please try a different one.');
    }
    youtubeLink = results.all[0].url;
  } else {
    youtubeLink = searchString;
  }
  let downloadInfo = await ytdl.getInfo(youtubeLink);
  
  
  await lib.discord.voice['@0.0.1'].tracks.play({
    channel_id:  voice_ch_id,
    guild_id: server_id,
    download_info: downloadInfo
  });
  let bex = txt.content.split(rex).join(' ');
  let str = txt.content.split(re);

   await lib.discord.channels['@0.3.4'].messages.update({
     message_id: msg_id, // required
   channel_id: ch_id,
   content: str.slice(0, 1) + `\n` + str.slice(2).join('\n'),
   tts: false,
   embeds: [
     {
       type: 'rich',
       title: `Music Player`,
       description: `Just type the name of your favorite song and enjoy listening to it \n\n**Now Playing** \n${downloadInfo.videoDetails.title} `,
       color: 0x00ffff,
      image: {
        url: downloadInfo.videoDetails.thumbnails[
          downloadInfo.videoDetails.thumbnails.length - 1
        ].url,
        height: 0,
        width: 0,
      },
       thumbnail: {
         url: `https://cdn.discordapp.com/attachments/1041720125608443944/1123648743959441460/avatars-xMRtQtC8AhlBNTUV-MXkWMg-t240x240.png`,
       },
       footer: {
         text: rex,
       }
     },
   ],
   components: [
   {
     type: 1,
     components: [
         {
          style: 1,
          label: `Spotify`,
          custom_id: `spotify`,
          disabled: false,
          type: 2,
         },   
         {
          style: 1,
          label: `Reset`,
          custom_id: `res`,
          disabled: false,
          type: 2,
         },    
         {
          style: 1,
          label: `Skip`,
          custom_id: `skip`,
          disabled: false,
          type: 2,
         }, 
         {
          style: 1,
          label: `Share`,
          custom_id: `share`,
          disabled: false,
          type: 2,
         },      
            ],
          },
          {
             "type": 1,
             "components": [
               {
                 "style": 2,
                 "label": `Enhance`,
                 "custom_id": `enhance`,
                 "disabled": false,
                 "type": 2
               },
               {
                 "style": 2,
                 "label": `Pause`,
                 "custom_id": `pause`,
                 "disabled": false,
                 "type": 2
               },
                {
                 "style": 2,
                 "label": `Lyrics`,
                 "custom_id": `lyrics`,
                 "disabled": false,
                 "type": 2
               }
             ]
           }
      ],
    });
}
catch (e) {

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
 console.log(e.message);
 }