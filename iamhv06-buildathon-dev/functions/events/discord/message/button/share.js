const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const jimp = require('jimp');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

let msg_id = `1168901039320203374`;

let searchString = context.params.event.message.embeds[0].footer.text;
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
let downloadInfo = await ytdl.getInfo(youtubeLink)
let url = downloadInfo.videoDetails.video_url;
console.log(url);
let qr = await lib.qrcode.generate['@0.0.4']({
  text: url,
  errorCorrectionLevel: 'Medium'
});
console.log(qr);
banner = downloadInfo.videoDetails.thumbnails[
  downloadInfo.videoDetails.thumbnails.length - 1
].url;

let sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

await lib.discord.channels['@0.1.2'].messages.create({
  channel_id: context.params.event.channel_id,
  content: ``,
// message_reference: {message_id: context.params.event.id},
  file: Buffer.from(qr, 'binary'),
  filename: "qr.jpg",
});

/*await lib.discord.channels['@0.3.4'].messages.update({
message_id: msg_id, // required
channel_id: context.params.event.channel_id,
 // file: Buffer//.from(qr, 'binary'),
    filename: "qr.jpg",
    file: Buffer.from(qr, 'binary'),
  embeds: [
    {
      type: 'rich',
      title: context.params.event.message.embeds[0].title,
      description: context.params.event.message.embeds[0].description,
      color: 0x00FFFF,
      "image": { 
      "url": "attachment://qr.jpg", 
       },
      footer: {
        text: context.params.event.message.embeds[0].footer.text,
      }
    }
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
      label: `Youtube`,
      custom_id: `yt`,
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
      label: `Lyrics`,
      custom_id: `lyrics`,
      disabled: false,
      type: 2,
     },     
        ]
      },
      ],
  });
   */

