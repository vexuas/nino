import { generateImageEmbed, generateImageEmbedV2 } from '.';
import { NekosImageSchema } from '../../schemas/nekos';
import { NekosImageV2Schema } from '../../schemas/nekosV2/image';
import { NEKOS_RANDOM_IMAGE_V2_DECORATED_DATA } from '../../utils/mocks';

const props: NekosImageSchema = {
  id: 'an id',
  url: 'a url',
  artist: null,
  source: {
    name: null,
    url: null,
  },
  nsfw: false,
  original: false,
  categories: [],
  characters: [],
  createdAt: 'a date',
  meta: {
    eTag: 'an etag',
    size: 1234,
    mimetype: 'a mimetype',
    color: 'a color',
    expires: 'a date',
    dimens: {
      width: 1234,
      height: 4321,
      aspectRatio: 'an aspect ratio',
      orientation: 'an orientation',
    },
  },
};

describe('Image Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateImageEmbed(props);

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateImageEmbed(props);

    expect(embed.color).not.toBeUndefined();
    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields.length).toBe(2);
  });
  it('does not display the description if source name is null', () => {
    const embed = generateImageEmbed(props);

    expect(embed.description).toBeUndefined();
  });
  it('does not display the description if source url is null', () => {
    const embed = generateImageEmbed(props);

    expect(embed.description).toBeUndefined();
  });
  it('displays the description if both source name and source url is defined', () => {
    const embed = generateImageEmbed({ ...props, source: { name: 'Test name', url: 'Test url' } });

    expect(embed.description).not.toBeUndefined();
  });
  it('shows the correct color in the embed', () => {
    const embed = generateImageEmbed({ ...props, meta: { ...props.meta, color: '#800000' } });

    expect(embed.color).not.toBeUndefined();
    expect(embed.color).toBe(8388608);
  });
  it('shows the correct artist in the embed if there is no artist', () => {
    const embed = generateImageEmbed(props);

    expect(embed.fields && embed.fields[0].name).toBe('Artist');
    expect(embed.fields && embed.fields[0].value).toBe('-');
  });
  it('shows the correct artist in the embed if there is an artist', () => {
    const artist = {
      id: '1',
      name: 'Test artist',
      url: 'a url',
      images: 1234,
    };
    const embed = generateImageEmbed({ ...props, artist });

    expect(embed.fields && embed.fields[0].name).toBe('Artist');
    expect(embed.fields && embed.fields[0].value).toBe('Test artist');
  });
  it('shows the correct categories in the embed if there are no categories', () => {
    const embed = generateImageEmbed({ ...props, categories: [] });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value).toBe('-');
  });
  it('shows the correct category in the embed if there is only one category', () => {
    const categories = [
      {
        id: '1',
        name: 'Girl',
        description: 'a description',
        nsfw: false,
        createdAt: 'some date',
      },
    ];
    const embed = generateImageEmbed({ ...props, categories });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value.includes(',')).toBe(false);
    expect(embed.fields && embed.fields[1].value).toBe('Girl');
  });
  it('shows the correct categories in the embed if there are a couple of categories', () => {
    const categories = [
      {
        id: '1',
        name: 'Girl',
        description: 'a description',
        nsfw: false,
        createdAt: 'some date',
      },
      {
        id: '2',
        name: 'Nekomimi',
        description: 'a description',
        nsfw: false,
        createdAt: 'some date',
      },
    ];
    const embed = generateImageEmbed({ ...props, categories });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value.includes(',')).toBe(true);
    expect(embed.fields && embed.fields[1].value).toBe('Girl, Nekomimi');
  });
});

const propsV2: NekosImageV2Schema = NEKOS_RANDOM_IMAGE_V2_DECORATED_DATA;

describe('Image V2 Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateImageEmbedV2(propsV2);

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateImageEmbedV2(propsV2);

    expect(embed.title).not.toBeUndefined();
    expect(embed.description).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields.length).toBe(3);
  });
  it('displays the Source correctly if source url and source name is present', () => {
    const embed = generateImageEmbedV2({
      ...propsV2,
      source: { name: 'Test name', url: 'Test url' },
    });

    expect(embed.description).not.toBeUndefined();
    expect(embed.description).toContain('Source: [Test name](Test url)');
  });
  it('displays the Source correctly if source url and source name is not present', () => {
    const embed = generateImageEmbedV2({ ...propsV2, source: { name: null, url: null } });

    expect(embed.description).not.toBeUndefined();
    expect(embed.description).toContain('Source: N.A.');
  });
  it('displays the Uploaded By correctly if uploader is present', () => {
    const embed = generateImageEmbedV2(propsV2);

    expect(embed.description).not.toBeUndefined();
    expect(embed.description).toContain('Uploaded by: Nekidev');
  });
  it('displays the Uploaded By correctly if uploader is not present', () => {
    const embed = generateImageEmbedV2({ ...propsV2, uploader: null });

    expect(embed.description).not.toBeUndefined();
    expect(embed.description).toContain('Uploaded by: N.A.');
  });
  it('shows the correct color in the embed if dominant color is present', () => {
    const embed = generateImageEmbedV2({
      ...propsV2,
      colors: { ...propsV2.colors, dominant: '#800000' },
    });

    expect(embed.color).not.toBeUndefined();
    expect(embed.color).toBe(8388608);
  });
  it('shows the correct color in the embed if dominant color is not present', () => {
    const embed = generateImageEmbedV2({
      ...propsV2,
      colors: { ...propsV2.colors, dominant: null },
    });

    expect(embed.color).not.toBeUndefined();
    expect(embed.color).toBe(16711765);
  });
  it('displays the correct artist field if there is an artist present with official links', () => {
    const embed = generateImageEmbedV2(propsV2);

    expect(embed.fields && embed.fields[0]).not.toBeUndefined();
    expect(embed.fields && embed.fields[0].name).toBe('Artist');
    expect(embed.fields && embed.fields[0].value).toBe(
      '[xilmo](https://www.pixiv.net/en/users/19389056)'
    );
  });
  it('displays the correct artist field if there is an artist present with no official links', () => {
    const artist = {
      id: '4acc3444-528f-4f9a-b275-927e32c78441',
      name: 'xilmo',
      aliases: ['夕末'],
      imageUrl: 'https://pbs.twimg.com/profile_images/1563823251293229056/CHZ_lqn3_400x400.jpg',
      officialLinks: [],
      timestamps: {
        created: '2023-02-20T08:40:27.006888Z',
        updated: '2023-02-20T08:40:27.006904Z',
      },
    };
    const embed = generateImageEmbedV2({
      ...propsV2,
      artist,
    });

    expect(embed.fields && embed.fields[0]).not.toBeUndefined();
    expect(embed.fields && embed.fields[0].name).toBe('Artist');
    expect(embed.fields && embed.fields[0].value).toBe('xilmo');
  });
  it('does not display the artist field if there is no artist present', () => {
    const embed = generateImageEmbedV2({ ...propsV2, artist: null });

    expect(embed.fields && embed.fields[0].name).not.toBe('Artist');
  });
  it('displays the correct categories field if there is one category present', () => {
    const categories = [
      {
        id: '60304e04-6b0b-4930-a3dc-ba8d9e36d160',
        name: 'Illustration',
        description: 'The image is an illustration.',
        sub: 'format',
        isNsfw: false,
        timestamps: {
          created: 'date 1',
          updated: 'date 2',
        },
      },
    ];
    const embed = generateImageEmbedV2({ ...propsV2, categories });

    expect(embed.fields && embed.fields[1]).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value.includes(',')).toBe(false);
    expect(embed.fields && embed.fields[1].value).toBe('Illustration');
  });
  it('displays the correct categories field if there are a couple of categories present', () => {
    const embed = generateImageEmbedV2(propsV2);

    expect(embed.fields && embed.fields[1]).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value.includes(',')).toBe(true);
    expect(embed.fields && embed.fields[1].value).toBe('Illustration, Girl');
  });
  it('does not display the categories field if there are no categories present', () => {
    const embed = generateImageEmbedV2({ ...propsV2, categories: [] });

    expect(embed.fields && embed.fields[1].name).not.toBe('Tags');
  });
  it('displays the correct characters field if there is one character present', () => {
    const characters = [
      {
        id: '15354108-4fd0-42a0-adf4-154cb142ed85',
        name: { first: 'Hitori', last: 'Gotoh', aliases: ['Go'] },
        description:
          'Hitori Gotoh, also known as Bocchi-chan is one of the main characters in the manga and anime series, Bocchi the Rock!. She is in the first year of Shuka High School and is in charge of the guitar and lyrics of the band, Kessoku Band.',
        gender: 'Female',
        species: 'Human',
        ages: [16],
        birthDate: '21 Februrary',
        nationality: 'Japanese',
        occupations: ['Guitarist', 'Student'],
        timestamps: {
          created: '2023-02-24T06:08:46.169441Z',
          updated: '2023-04-04T00:58:19.264363Z',
        },
      },
    ];
    const embed = generateImageEmbedV2({ ...propsV2, characters });

    expect(embed.fields && embed.fields[2]).not.toBeUndefined();
    expect(embed.fields && embed.fields[2].name).toBe('Characters');
    expect(embed.fields && embed.fields[2].value.includes(',')).toBe(false);
    expect(embed.fields && embed.fields[2].value).toBe('Hitori Gotoh');
  });
  it('displays the correct characters field if there are a couple of characters present', () => {
    const embed = generateImageEmbedV2(propsV2);

    expect(embed.fields && embed.fields[2]).not.toBeUndefined();
    expect(embed.fields && embed.fields[2].name).toBe('Characters');
    expect(embed.fields && embed.fields[2].value.includes(',')).toBe(true);
    expect(embed.fields && embed.fields[2].value).toBe('Hitori Gotoh, Ikuyo Kita');
  });
  it('does not display the characters field if there are no characters present', () => {
    const embed = generateImageEmbedV2({ ...propsV2, characters: [] });

    expect(embed.fields && embed.fields[2]).toBeUndefined();
  });
});
