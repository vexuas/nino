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
  const orientation: 'Portrait' | 'Landscape' = data.width > data.height ? 'Landscape' : 'Portrait';
  const embed: APIEmbed = {
    title: 'Random Waifu',
    color,
    description: `${hyperlink('Source', data.source)} | ${hyperlink('Preview', data.preview_url)}`,
    image: {
      url: data.url,
    },
    fields: [
      {
        name: 'Orientation',
        value: orientation,
        inline: true,
      },
      {
        name: 'Tags',
        value: tags,
        inline: true,
      },
    ],
  };
  return embed;
};

export default {
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
