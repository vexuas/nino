import { APIEmbed, Client, hyperlink, SlashCommandBuilder } from 'discord.js';
import { BOT_UPDATED_AT, BOT_VERSION } from '../../version';
import { AppCommand, AppCommandOptions } from '../commands';
import { format } from 'date-fns';
import { sendErrorLog } from '../../utils/helpers';

export const generateAboutEmbed = (app?: Client): APIEmbed => {
  const embed = {
    title: 'Info',
    description:
      "Hi there! I'm Nino and I provide an easy way to get waifu images and gifs! I don't really have any preferences so I always give random ones!\n\nMy data is retrieved from https://www.waifu.im/\n\nHappy waifus!",
    color: 55296,
    thumbnail: {
      url: 'https://cdn.discordapp.com/attachments/1097563418237599800/1098660924212117585/nino-waifuim1.png',
    },
    fields: [
      {
        name: 'Creator',
        value: 'Vexuas#8141',
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
        value: hyperlink('Come join!', 'https://discord.gg/CJrx8TtM9V'),
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
