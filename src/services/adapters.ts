import got from 'got';

const BASE_URL = 'https://api.waifu.im/';

export async function getRandomWaifu() {
  const data = await got.get(`${BASE_URL}/search`);
  console.log(data);
  return data;
}
