import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { capitalize } from 'lodash';
import { OtakuAPISchema } from '../../schemas/otaku';
import { getOtakuGif, getOtakuReactions } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export const generateGifEmbed = (data: OtakuAPISchema, reaction: string): APIEmbed => {
  const color = parseInt('#ff0055'.replace('#', '0x'));
  const embed: APIEmbed = {
    title: `Gif Command | ${capitalize(reaction)}`,
    color,
    image: {
      url: data.url,
    },
  };
  return embed;
};

export default {
  commandType: 'Anime',
  data: new SlashCommandBuilder().setName('gif').setDescription('Shows a random anime gif'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const reactions = await getOtakuReactions();
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      const data = await getOtakuGif(randomReaction);
      const embed = generateGifEmbed(data, randomReaction);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
