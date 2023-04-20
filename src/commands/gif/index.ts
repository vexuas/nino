import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { getOtakuGif } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export const generateGifEmbed = (data: any): APIEmbed => {
  const embed: APIEmbed = {
    image: {
      url: data.url,
    },
  };
  return embed;
};

export default {
  commandType: 'Waifu',
  data: new SlashCommandBuilder().setName('gif').setDescription('Shows a random waifu gif'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const data = await getOtakuGif('kiss');
      const embed = generateGifEmbed(data);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
