import { generateImageEmbed } from '.';
import { NekosImageSchema } from '../../schemas/nekos';

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
