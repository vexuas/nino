import { generateGifEmbed } from '.';
import { WaifuSchema } from '../../schemas/waifu';

const props: WaifuSchema = {
  signature: 'a signature',
  extension: 'an extension',
  image_id: 1,
  favorites: 100,
  dominant_color: 'a color',
  source: 'a source',
  uploaded_at: 'uploaded sometime',
  liked_at: null,
  is_nsfw: false,
  width: 100,
  height: 200,
  byte_size: 20,
  url: 'a url',
  preview_url: 'a preview',
  tags: [
    {
      tag_id: 1,
      name: 'a tag',
      description: 'a description',
      is_nsfw: false,
    },
  ],
};

describe('Gif Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateGifEmbed(props);

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateGifEmbed(props);

    expect(embed.description).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields.length).toBe(2);
  });
  it('shows the correct color in the embed', () => {
    const embed = generateGifEmbed({ ...props, dominant_color: '#800000' });

    expect(embed.color).not.toBeUndefined();
    expect(embed.color).toBe(8388608);
  });
  it('shows the correct tags in the embed if there are no tags', () => {
    const embed = generateGifEmbed({ ...props, tags: [] });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value).toBe('');
  });
  it('shows the correct tags in the embed if there is only one tag', () => {
    const tags = [
      {
        tag_id: 1,
        name: 'waifu',
        description: 'a description',
        is_nsfw: false,
      },
    ];
    const embed = generateGifEmbed({ ...props, tags });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value.includes(',')).toBe(false);
    expect(embed.fields && embed.fields[1].value).toBe('waifu');
  });
  it('shows the correct tags in the embed if there are a couple of tags', () => {
    const tags = [
      {
        tag_id: 1,
        name: 'waifu',
        description: 'a description',
        is_nsfw: false,
      },
      {
        tag_id: 2,
        name: 'uniform',
        description: 'a description',
        is_nsfw: false,
      },
    ];
    const embed = generateGifEmbed({ ...props, tags });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[1].name).toBe('Tags');
    expect(embed.fields && embed.fields[1].value.includes(',')).toBe(true);
    expect(embed.fields && embed.fields[1].value).toBe('waifu, uniform');
  });
  it('shows the correct orientation if width is larger than height', () => {
    const embed = generateGifEmbed({ ...props, width: 1200, height: 1000 });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[0].name).toBe('Orientation');
    expect(embed.fields && embed.fields[0].value).toBe('Landscape');
  });
  it('shows the correct orientation if height is larger than width', () => {
    const embed = generateGifEmbed({ ...props, width: 1000, height: 1200 });

    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields[0].name).toBe('Orientation');
    expect(embed.fields && embed.fields[0].value).toBe('Portrait');
  });
});
