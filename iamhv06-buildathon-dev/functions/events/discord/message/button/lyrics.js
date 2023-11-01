const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let name = `${context.params.event.message.embeds[0].footer.text}` //`${context.params.event.message.embeds[0].title}-${context.params.event.message.embeds[0].footer.text} `
 let song = await lib.ctks['genius-lyrics']['@1.0.2']({name});
 if (!song || !song.lyrics) {
let gg = await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
  token: context.params.event.token,
  content: `Sorry!, i was unable to find any lyrics for that song.`,
});
console.log(name);

} else {
console.log(song);
let msg = await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
token: context.params.event.token,
  content: ``,
  components: [
  {
    type: 1,
    components: [
      {
             "style": 1,
             "label": `Translate`,
             "custom_id": `trans`,
             "disabled": false,
             "type": 2,
           },
         ]
       }
   ],
  embeds: [
    {
    type: 'rich',  
    title: song.title,
    description: song.lyrics,
    color: song.song_art_primary_color
    ? parseInt(song.song_art_primary_color.replace('#', '0x'))
    : 0xffffff,
    thumbnail: {url: song.song_art_image_url},
  }
  ]
});
}
