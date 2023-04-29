import { Channel, Client } from 'discord.js';
import { generateGifEmbed } from '../commands/gif';
import { generateImageEmbedV2 } from '../commands/image';
import { generateWaifuEmbed } from '../commands/waifu';
import { sendErrorLog } from '../utils/helpers';
import { getNekosImageV2, getOtakuGif, getOtakuReactions, getWaifu } from './adapters';

export async function sendScheduledCommands(app: Client) {
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
