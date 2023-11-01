const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {guild_id, member} = context.params.event;

let status = await lib.discord.voice['@0.0.1'].tracks.retrieve({
  guild_id,
});

if (status.paused) {
await lib.discord.voice['@0.0.1'].tracks.resume({
  guild_id,
});
} else {
  await lib.discord.voice['@0.0.1'].tracks.pause({
    guild_id,
  });
}
