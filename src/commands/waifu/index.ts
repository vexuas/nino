import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

const generateWaifuEmbed = (): APIEmbed => {
  const embed = {
    title: 'Waifu Command',
    color: 55296,
    description: 'Waifu goes here',
  };

  return embed;
};

export default {
  data: new SlashCommandBuilder().setName('waifu').setDescription('Shows a random waifu image'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const embed = generateWaifuEmbed();
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
