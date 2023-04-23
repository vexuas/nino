import { APIEmbed, hyperlink, SlashCommandBuilder } from 'discord.js';
import { isEmpty, reduce } from 'lodash';
import { NekosImageSchema } from '../../schemas/nekos';
import { getNekosImage, getNekosImageV2 } from '../../services/adapters';
import { sendErrorLog } from '../../utils/helpers';
import { AppCommand, AppCommandOptions } from '../commands';

export const generateImageEmbed = (data: NekosImageSchema): APIEmbed => {
  const color = parseInt(data.meta.color.replace('#', '0x'));
  const tags = reduce(
    data.categories,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ', '}${value.name}`;
    },
    ''
  );
  const embed: APIEmbed = {
    title: 'Random Image',
    description:
      data.source.url && data.source.name
        ? `${hyperlink('Source URL', data.source.url)} | ${hyperlink(
            'Source Name',
            data.source.name
          )}`
        : undefined,
    color,
    image: {
      url: data.url,
    },
    fields: [
      {
        name: 'Artist',
        value: data.artist ? data.artist.name : '-',
        inline: true,
      },
      {
        name: 'Tags',
        value: isEmpty(tags) ? '-' : tags,
        inline: true,
      },
    ],
  };
  return embed;
};

export const generateImageEmbedV2 = (data: any): APIEmbed => {
  const isNSFW = !(
    data.attributes.ageRating === 'sfw' || data.attributes.ageRating === 'questionable'
  );
  const color = parseInt(
    data.attributes.colors.dominant
      ? data.attributes.colors.dominant.replace('#', '0x')
      : '#ff0055'.replace('#', '0x')
  );
  const tags = reduce(
    data.categories,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ', '}${value.name}`;
    },
    ''
  );
  const embed: APIEmbed = {
    title: `Random Image ${isNSFW ? '| HOLD UP' : ''}`,
    description:
      data.attributes.source.url && data.attributes.source.name
        ? `Source: ${hyperlink(data.attributes.source.name, data.attributes.source.url)}`
        : undefined,
    color,
    image: {
      url: data.attributes.file,
    },
    fields: [
      {
        name: 'Artist',
        value: data.artist ? data.artist.name : '-',
        inline: true,
      },
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
  data: new SlashCommandBuilder().setName('image').setDescription('Shows a random anime image'),
  async execute({ interaction, flagsmith }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const flags = flagsmith && (await flagsmith.getEnvironmentFlags());
      const isUseV2Enabled = flags && flags.isFeatureEnabled('use_nekos_api_v2');
      if (isUseV2Enabled) {
        const data = await getNekosImageV2();
        const embed = generateImageEmbedV2(data);
        await interaction.editReply({ embeds: [embed] });
      } else {
        const data = await getNekosImage();
        const embed = generateImageEmbed(data);
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
