import { APIEmbed, Client, SlashCommandBuilder } from 'discord.js';
import { BOT_UPDATED_AT, BOT_VERSION } from '../../version';
import { AppCommand, AppCommandOptions } from '../commands';
import { format } from 'date-fns';
import { sendErrorLog } from '../../utils/helpers';

export const generateAboutEmbed = (app?: Client): APIEmbed => {
  const embed = {
    title: 'Info',
    description:
      "Hi there! This is where you'd want to explain what your App does and any other cool stuff about it! :D",
    color: 55296,
    thumbnail: {
      url: 'https://cdn.discordapp.com/attachments/1089616880576245853/1094559253395689562/mitsuha.jpg',
    },
    fields: [
      {
        name: 'Creator',
        value: '-',
        inline: true,
      },
      {
        name: 'Date Created',
        value:
          app && app.application ? format(app.application.createdTimestamp, 'dd-MM-yyyy') : 'N/A',
        inline: true,
      },
      {
        name: 'Version',
        value: BOT_VERSION,
        inline: true,
      },
      {
        name: 'Library',
        value: 'discord.js',
        inline: true,
      },
      {
        name: 'Last Updated',
        value: BOT_UPDATED_AT,
        inline: true,
      },
      {
        name: 'Support Server',
        value: '-',
        inline: true,
      },
    ],
  };
  return embed;
};
export default {
  commandType: 'Information',
  data: new SlashCommandBuilder()
    .setName('about')
    .setDescription('Displays information about My App'),
  async execute({ interaction, app }: AppCommandOptions) {
    try {
      const embed = generateAboutEmbed(app);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
