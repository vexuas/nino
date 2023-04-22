import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { getNekosImage } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export const generateImageEmbed = (data: any): APIEmbed => {
  const color = parseInt('#ff0055'.replace('#', '0x'));
  const embed: APIEmbed = {
    color,
    image: {
      url: data.url,
    },
  };
  return embed;
};

export default {
  data: new SlashCommandBuilder().setName('image').setDescription('Shows a random anime image'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const data = await getNekosImage();
      const embed = generateImageEmbed(data);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
