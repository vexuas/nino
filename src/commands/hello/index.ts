import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export function generateHelloEmbed(): APIEmbed {
  const embed: APIEmbed = {
    title: 'Hello',
    color: 55296,
    description: 'Hi there! (◕ᴗ◕✿)',
    thumbnail: {
      url: 'https://cdn.discordapp.com/attachments/1089616880576245853/1094559253395689562/mitsuha.jpg',
    },
  };
  return embed;
}

export default {
  data: new SlashCommandBuilder().setName('hello').setDescription('Greets the user!'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const embed = generateHelloEmbed();
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
