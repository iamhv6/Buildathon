const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let song = await lib.discord.voice['@0.0.1'].tracks.retrieve({
  guild_id: `1127182091914858571`
});

console.log(song);