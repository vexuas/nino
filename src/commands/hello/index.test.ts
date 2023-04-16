import { generateHelloEmbed } from '.';

describe('Hello Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateHelloEmbed();

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateHelloEmbed();

    expect(embed.description).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
  });
});
