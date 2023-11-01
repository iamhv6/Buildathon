const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let answer = context.params.event.data.components.map((componentRow) => {
  let textField = componentRow.components[0];
  return [textField.value];
});

const trs = require('@iamtraction/google-translate');
const {guild_id, channel_id, member, emoji, message_id} = context.params.event;

let out,
  msg = context.params.event.message.embeds[0].description;
let nothing = answer[0][0];

switch (answer[0][0]) {
  case 'sa':
  case '🇸🇦':
  case 'sanskrit':
    out = 'ar';
    break;
  case 'de':  
  case '🇩🇪':
  case 'german':
    out = 'de';
    break;
  case 'english':
  case '🇺🇲':
  case 'US':
  case 'en':
  case '🇺🇸':
  case '🇬🇧':
    out = 'en';
    break;
  case 'es':
  case 'spanish':  
  case '🇪🇸':
    out = 'es';
    break;
  case '🇫🇷':
  case 'fr':
  case 'french':
    out = 'fr';
    break;
    case '🇮🇳':
    case 'in':
  case 'hindi':
    out = 'hi';
    break;
    case 'id':
    case 'indonesian':
  case '🇮🇩':
    out = 'id';
    break;
  case '🇯🇵':
  case 'jp':
  case 'japanese':
    out = 'ja';
    break;
  case '🇳🇱':
  case 'nl':
  case 'dutch':
    out = 'nl';
    break;
  case 'pt':
  case 'portuguese':  
  case '🇵🇹':
    out = 'pt';
    break;
  case '🇷🇺':
  case 'ru':
  case 'russian':
    out = 'ru';
    break;
  case '🇺🇦':
  case 'ua':
  case 'ukrainian':
    out = 'uk';
    break;
  case 'chinese':
  case 'HK':  
  case '🇭🇰':
  case '🇨🇳':
  case 'cn':
  case '🇹🇼':
  case 'TW':
    out = 'zh-tw';
    break;
  case `${nothing}`:
  out = answer[0][0]; 
  break; 
  default:
    return;
}
try {
await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
token: context.params.event.token,
    content: '',
    embeds: [
      {
        type: 'rich',
        title: context.params.event.message.embeds[0].title,
        description:
          (await trs(msg, {to: out}).then((res) => res.text)) +
          '\n** **\n',
        color: context.params.event.message.embeds[0].color,
        thumbnail: context.params.event.message.embeds[0].thumbnail,
        }
    ],
  });
  } catch (e) {
    if (e.message.includes(`The language '${answer[0][0]}' is not supported.`)){
      await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
      token: context.params.event.token,
          content: `the language is not supported due to invalid format or no non existence of it in the database`,
        });
    }
if (nothing){
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
  token: context.params.event.token,
      content: '',
      embeds: [
        {
          type: 'rich',
          title: context.params.event.message.embeds[0].title,
          description:
            (await trs(msg, {to: nothing}).then((res) => res.text)) +
            '\n** **\n',
          color: context.params.event.message.embeds[0].color,
          thumbnail: context.params.event.message.embeds[0].thumbnail,
          }
      ],
    });
} else {
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
  token: context.params.event.token,
      content: `Please make sure you have entered a valid language code (no cap)`,
    });
}
}