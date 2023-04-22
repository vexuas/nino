import { APIEmbed, hyperlink, SlashCommandBuilder } from 'discord.js';
import { isEmpty, reduce } from 'lodash';
import { WaifuSchema } from '../../schemas/waifu';
import { getWaifu } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export const generateWaifuEmbed = (data: WaifuSchema): APIEmbed => {
  const color = parseInt(data.dominant_color.replace('#', '0x'));
  const tags = reduce(
    data.tags,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ', '}${value.name}`;
    },
    ''
  );
  const embed: APIEmbed = {
    title: 'Random Waifu',
    color,
    description: `${hyperlink('Source', data.source)} | ${hyperlink('Preview', data.preview_url)}`,
    image: {
      url: data.url,
    },
    fields: [
      {
        name: 'Tags',
        value: isEmpty(tags) ? '-' : tags,
        inline: true,
      },
    ],
  };
  return embed;
};

export default {
  commandType: 'Anime',
  data: new SlashCommandBuilder().setName('waifu').setDescription('Shows a random waifu image'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const data = await getWaifu();
      const embed = generateWaifuEmbed(data);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
