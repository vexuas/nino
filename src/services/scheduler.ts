import { Channel, Client, userMention } from 'discord.js';
import { generateGifEmbed } from '../commands/gif';
import { generateWaifuEmbed } from '../commands/waifu';
import { sendErrorLog } from '../utils/helpers';
import { getOtakuGif, getOtakuReactions, getWaifu } from './adapters';

export async function sendScheduledCommands(app: Client) {
  try {
    const waifuData = await getWaifu();
    const reactions = await getOtakuReactions();
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    const gifData = await getOtakuGif(randomReaction);

    const waifuEmbed = generateWaifuEmbed(waifuData);
    const gifEmbed = generateGifEmbed(gifData, randomReaction);

    const scheduleChannel: Channel | undefined = app.channels.cache.get('1101852189422518342');
    scheduleChannel &&
      scheduleChannel.isTextBased() &&
      (await scheduleChannel.send({
        content: userMention('183444648360935424'),
        embeds: [waifuEmbed, gifEmbed],
      }));
  } catch (error) {
    sendErrorLog({ error });
  }
}
