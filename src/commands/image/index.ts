import { APIEmbed, hyperlink, bold, SlashCommandBuilder } from 'discord.js';
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
  console.log(data);
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
  const embed: APIEmbed = {
    title: 'Random Image',
    description: `${
      data.source.url && data.source.name
        ? `${bold('Source')}: ${hyperlink(data.source.name, data.source.url)}\n`
        : ''
    }${bold('Uploaded by')}: ${data.uploader.username}`,
    color,
    image: {
      url: data.file,
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
        // const data = await getNekosImageV2();
        const data = {
          id: 'ff59239b-1854-471b-b4bc-825ff5ac08e4',
          file: 'https://cdn.nekosapi.com/uploads/images/TJWKYO3YKBED7LBLYGEA2TJGCI.webp',
          title: 'Football girl',
          colors: {
            dominant: '#ccd4da',
            palette: [
              '#264c5d',
              '#dadde2',
              '#64919a',
              '#55655e',
              '#97b8c7',
              '#51606f',
              '#91a395',
              '#8a8f8d',
              '#3c95c6',
            ],
          },
          source: {
            name: 'Danbooru',
            url: 'https://danbooru.donmai.us/post/show/5322715',
          },
          dimens: {
            height: 1200,
            width: 765,
            aspectRatio: '51:80',
            orientation: 'portrait',
          },
          isOriginal: false,
          verificationStatus: 'verified',
          ageRating: 'sfw',
          metadata: { mimetype: 'image/webp', fileSize: 393918 },
          timestamps: {
            created: '2023-02-13T21:22:23.811520Z',
            updated: '2023-04-04T01:34:41.179148Z',
          },
          categories: [
            {
              id: 'cd1f42bf-7de0-4a60-ab48-9922cd9b935d',
              name: 'Sportswear',
              description: 'One or more characters are wearing sportswear.',
              sub: 'character',
              isNsfw: false,
              timestamps: [],
            },
          ],
          characters: [],
          artist: {
            id: 'a03f3e6e-4090-461f-bcd2-232c7b922800',
            name: 'RUDA',
            aliases: ['RUDA_E'],
            imageUrl:
              'https://i.pximg.net/user-profile/img/2020/11/05/12/18/20/19619219_bbf81c1dd8dd1306013f24dce0a55de0_170.png',
            officialLinks: [
              'https://www.pixiv.net/en/users/33590509',
              'https://twitter.com/RUDA_E',
              'https://ruda.fanbox.cc/',
            ],
            timestamps: {
              created: '2023-04-04T01:19:10.741427Z',
              updated: '2023-04-04T01:19:10.741443Z',
            },
          },
          uploader: {
            id: '8fad93cd-4a9c-4e71-b21f-6eb4efebb3db',
            username: 'Nekidev',
            nickname: 'Neki',
            biography: '',
            avatarImage:
              'https://cdn.nekosapi.com/uploads/user/avatar/L7PSX2YOY5CG5K67JJJZRCNRVY.webp',
            timestamps: { joined: '2023-01-29T09:04:52Z' },
            permissions: { isActive: true, isStaff: true, isSuperuser: true },
          },
          likedBy: [],
        };
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
