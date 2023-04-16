import { generateHelpEmbed } from '.';

describe('Help Command', () => {
  it('generates an embed correctly', () => {
    const embed = generateHelpEmbed();

    expect(embed).not.toBeUndefined();
  });
  it('displays the correct fields in the embed', () => {
    const embed = generateHelpEmbed();

    expect(embed.description).not.toBeUndefined();
    expect(embed.color).not.toBeUndefined();
  });
  //TODO: Test command fields when discordjs figures out a way to mock data for tests
});
