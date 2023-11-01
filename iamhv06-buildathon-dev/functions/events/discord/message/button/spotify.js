const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {Spotify} = require('spotify-info.js');
const axios = require('axios');

const infos = new Spotify({
  clientID: ``,   //please create a spotify client secret and client id at (https://developer.spotify.com/dashboard)
  clientSecret: ``,
});
const commafy = require('commafy');
const convertMS = require('ms-convert');


let ch_id = `1168843865533456384`;
let server_id = `1127182091914858571`;
 let msg_id = `1168901039320203374`;
let voice_ch_id = `1127182092544000053`;
 
let answer = context.params.event.message.embeds[0].footer.text; 
console.log(`Footer text: ${answer}`);
const tracks = await infos.searchTrack(`${answer}`);

let track = tracks.map((track) => tracks[0]);
let txt = await lib.discord.channels['@0.3.4'].messages.retrieve({
  message_id: msg_id,
  channel_id: ch_id
});
let text = txt.content;

let trackArtists = track.map((track) => track.artists);
let aTrackArtists = trackArtists[0].map(({name}) => name).join(',');
 console.log(track[0].name);
 if (track[0].preview_url) {
await lib.discord.channels['@0.3.4'].messages.update({
message_id: msg_id, // required
channel_id: ch_id,
content: text,
embeds: [
  {
    title: track[0].name,
    url: track[0].external_urls.spotify,
    fields: [
      {
        name: `Artists`,
        value: aTrackArtists,
        inline: true,
      },
      {
        name: `Album`,
        value: track[0].album.name,
        inline: true,
      },
      {
        name: `Duration`,
        value: convertMS(track[0].duration_ms),
        inline: true,
      },
      {
        name: `Album Released on`,
        value: track[0].album.release_date,
        inline: true,
      },
    ],
    thumbnail: {url: track[0].album.images[0].url},
    color: 0x1db954,
    footer: {
      text: context.params.event.message.embeds[0].footer.text,
    }
  },
],
components: [
{
  type: 1,
  components: [
    {
           "style": 1,
           "label": `YouTube`,
           "custom_id": `yt`,
           "disabled": false,
           "type": 2,
         },
         {
           "style": 1,
           "label": `Reset`,
           "custom_id": `res`,
           "disabled": false,
           "type": 2,
         },
         {
           "style": 1,
           "label": `Lyrics`,
           "custom_id": `lyrics`,
           "disabled": false,
           "type": 2,
         },
         {
           "style": 1,
           "label": `Skip`,
           "custom_id": `skip`,
           "disabled": false,
           "type": 2,
         },
         {
           style: 5,
           label: `View Preview`,   
           url: track[0].preview_url,
           disabled: false,
           emoji: {
             id: `933437492294725652`,
             name: `Spotify`,
             animated: false,
           },
           type: 2,
         },
       ]
     }
 ],
 
});
}
else  {
 await lib.discord.channels['@0.3.4'].messages.update({
 message_id: msg_id, // required
 channel_id: ch_id,
 content: text,
 embeds: [
   {
     title: track[0].name,
     url: track[0].external_urls.spotify,
     fields: [
       {
         name: `Artists`,
         value: aTrackArtists,
         inline: true,
       },
       {
         name: `Album`,
         value: track[0].album.name,
         inline: true,
       },
       {
         name: `Duration`,
         value: convertMS(track[0].duration_ms),
         inline: true,
       },
       {
         name: `Album Released on`,
         value: track[0].album.release_date,
         inline: true,
       },
     ],
     thumbnail: {url: track[0].album.images[0].url},
     color: 0x1db954,
     footer: {
       text: context.params.event.message.embeds[0].text,
     }
   },
 ],
 components: [
 {
   type: 1,
   components: [
     {
            "style": 1,
            "label": `YouTube`,
            "custom_id": `yt`,
            "disabled": false,
            "type": 2,
          },
          {
            "style": 1,
            "label": `Reset`,
            "custom_id": `res`,
            "disabled": false,
            "type": 2,
          },
          {
            "style": 1,
            "label": `Lyrics`,
            "custom_id": `lyrics`,
            "disabled": false,
            "type": 2,
          },
          {
            "style": 1,
            "label": `Skip`,
            "custom_id": `skip`,
            "disabled": false,
            "type": 2,
          },
        ]
      }
  ],
  
 });
}

console.log(track[0]);
