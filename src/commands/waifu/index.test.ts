import { generateWaifuEmbed } from '.';
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

describe('Waifu Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateWaifuEmbed(props);

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateWaifuEmbed(props);

    expect(embed.description).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
    expect(embed.fields).not.toBeUndefined();
    expect(embed.fields && embed.fields.length).toHaveLength(2);
  });
  it('shows the correct color of the embed', () => {
    const dominantColor = '#800000';
    const embed = generateWaifuEmbed({ ...props, dominant_color: dominantColor });

    expect(embed.color).not.toBeUndefined();
    expect(embed.color).toBe(parseInt(dominantColor.replace('#', '0x')));
  });
});
