import { generateGifEmbed } from '.';

const props = {
  data: {
    url: 'test url',
  },
  reaction: 'test reaction',
};

describe('Waifu Command', () => {
  it('generates an embed correctly', () => {
    const { data, reaction } = props;
    const embed = generateGifEmbed(data, reaction);

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const { data, reaction } = props;
    const embed = generateGifEmbed(data, reaction);

    expect(embed.title).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
    expect(embed.image).not.toBeUndefined();
  });
  it('displays the correct reaction in the embed', () => {
    const { data, reaction } = props;
    const embed = generateGifEmbed(data, reaction);

    expect(embed.title).not.toBeUndefined();
    expect(embed.title).toBe('Gif Command | Test reaction');
  });
});
