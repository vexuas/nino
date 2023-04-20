import { AppCommand, AppCommandOptions } from '../commands';
import { APIEmbed, hyperlink, SlashCommandBuilder } from 'discord.js';
import { sendErrorLog } from '../../utils/helpers';

export const generateInviteEmbed = (): APIEmbed => {
  const embed = {
    description: hyperlink(
      'Add me to your servers! (◕ᴗ◕✿)',
      'https://discord.com/api/oauth2/authorize?client_id=1097565092175937699&permissions=3072&scope=bot%20applications.commands'
    ),
    color: 55296,
  };
  return embed;
};

export default {
  commandType: 'Information',
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Generates an invite link for My App'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      const embed = generateInviteEmbed();
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
