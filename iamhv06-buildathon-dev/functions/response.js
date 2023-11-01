const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.4'].messages.create({
  channel_id: `1168843865533456384`,
  content: `test` // required
});