import { SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export default {
  data: new SlashCommandBuilder().setName('waifu').setDescription('Shows a random waifu image'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      await interaction.editReply({ content: 'waifu' });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
