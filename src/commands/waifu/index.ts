import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { getRandomWaifu } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

const generateWaifuEmbed = (data: any): APIEmbed => {
  const embed: APIEmbed = {
    title: 'Waifu Command',
    color: 55296,
    description: 'Waifu goes here',
    image: {
      url: data.url,
    },
  };

  return embed;
};

export default {
  data: new SlashCommandBuilder().setName('waifu').setDescription('Shows a random waifu image'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const data = await getRandomWaifu();
      const embed = generateWaifuEmbed(data);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
