import { Channel, Client, GatewayIntentBits } from 'discord.js';
import { BOT_TOKEN, MIXPANEL_ID, FLAGSMITH_KEY } from './config/environment';
import { registerEventHandlers } from './events/events';
import { sendErrorLog } from './utils/helpers';
import Mixpanel from 'mixpanel';
import { isEmpty } from 'lodash';
import Flagsmith from 'flagsmith-nodejs';
import { getNekosImageV2, getOtakuGif, getOtakuReactions, getWaifu } from './services/adapters';
import { generateWaifuEmbed } from './commands/waifu';
import { generateGifEmbed } from './commands/gif';
import { generateImageEmbedV2 } from './commands/image';

const app: Client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const initialize = async (): Promise<void> => {
  try {
    await app.login(BOT_TOKEN);
    const mixpanel = MIXPANEL_ID && !isEmpty(MIXPANEL_ID) ? Mixpanel.init(MIXPANEL_ID) : null;
    const flagsmith =
      FLAGSMITH_KEY && !isEmpty(FLAGSMITH_KEY)
        ? new Flagsmith({
            environmentKey: FLAGSMITH_KEY,
            defaultFlagHandler: () => {
              return { enabled: false, isDefault: true, value: undefined };
            },
          })
        : null;
    registerEventHandlers({ app, mixpanel, flagsmith });
  } catch (error) {
    sendErrorLog({ error });
  }
};

export async function sendScheduledCommands() {
  try {
    const waifuData = await getWaifu();
    const reactions = await getOtakuReactions();
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    const gifData = await getOtakuGif(randomReaction);
    const imageData = await getNekosImageV2();

    const waifuEmbed = generateWaifuEmbed(waifuData);
    const gifEmbed = generateGifEmbed(gifData, randomReaction);
    const imageEmbed = generateImageEmbedV2(imageData);

    const scheduleChannel: Channel | undefined = app.channels.cache.get('1101852189422518342');
    scheduleChannel &&
      scheduleChannel.isTextBased() &&
      (await scheduleChannel.send({ embeds: [waifuEmbed, imageEmbed, gifEmbed] }));
  } catch (error) {
    sendErrorLog({ error });
  }
}

initialize();
