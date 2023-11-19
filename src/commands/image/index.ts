import { APIEmbed, hyperlink, SlashCommandBuilder } from 'discord.js';
import { isEmpty, reduce } from 'lodash';
import { NekosImageSchema } from '../../schemas/nekos';
import { NekosImageV2Schema } from '../../schemas/nekosV2/image';
import { getNekosImage } from '../../services/adapters';
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

export const generateImageEmbedV2 = (data: NekosImageV2Schema): APIEmbed => {
  const color = parseInt(
    data.colors.dominant ? data.colors.dominant.replace('#', '0x') : '#ff0055'.replace('#', '0x')
  );
  const tags = reduce(
    data.categories,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ', '}${value.name}`;
    },
    ''
  );
  const characters = reduce(
    data.characters,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ', '}${value.name.first ?? ''} ${
        value.name.last ?? ''
      }`;
    },
    ''
  );

  const embed: APIEmbed = {
    title: 'Random Image',
    description: `Source: ${
      data.source.url && data.source.name
        ? `${hyperlink(data.source.name, data.source.url)}`
        : 'N.A.'
    }\n${'Uploaded by'}: ${data.uploader ? data.uploader.username : 'N.A.'}`,
    color,
    image: {
      url: data.file,
      width: data.dimens.width < 1200 ? 1200 : data.dimens.width,
    },
    fields: [],
  };
  data.artist &&
    embed.fields?.push({
      name: 'Artist',
      value:
        data.artist.officialLinks && data.artist.officialLinks.length > 0
          ? hyperlink(data.artist.name, data.artist.officialLinks[0])
          : data.artist.name,
      inline: true,
    });
  !isEmpty(tags) &&
    embed.fields?.push({
      name: 'Tags',
      value: tags,
      inline: true,
    });
  !isEmpty(characters) &&
    embed.fields?.push({
      name: 'Characters',
      value: characters,
    });
  return embed;
};
export default {
  commandType: 'Anime',
  data: new SlashCommandBuilder().setName('image').setDescription('Shows a random anime image'),
  async execute({ interaction }: AppCommandOptions) {
    try {
      await interaction.deferReply();
      const data = await getNekosImage();
      const embed = generateImageEmbed(data);
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      sendErrorLog({ error, interaction });
    }
  },
} as AppCommand;
