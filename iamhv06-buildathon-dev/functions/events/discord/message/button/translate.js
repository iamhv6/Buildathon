const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.interactions['@1.0.1'].responses.modals.create({
  token: `${context.params.event.token}`,
  custom_id: `tra`,
  title: `Translator`,
  components: [
    {
      type: 1, 
      components: [{
        type: 4,
        custom_id: 'answerage',
        label: `Please type a language code, name, emoji`, 
        style: 1, 
        min_length: 1,
        max_length: 80,
        placeholder: 'Lower case',
        required: true
      }],
    },
    ],
    });