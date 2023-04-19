import { APIEmbed, SlashCommandBuilder } from 'discord.js';
import { isEmpty, reduce } from 'lodash';
import { SearchWaifuSchema } from '../../schemas/searchWaifu';
import { getWaifu } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

const generateWaifuEmbed = (data: SearchWaifuSchema): APIEmbed => {
  const color = parseInt(data.dominant_color.replace('#', '0x'));
  const tags = reduce(
    data.tags,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ','} ${value.name}`;
    },
    ''
  );
  const embed: APIEmbed = {
    title: 'Waifu Command',
    color,
    description: 'Waifu goes here',
    image: {
      url: data.url,
    },
    fields: [
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
