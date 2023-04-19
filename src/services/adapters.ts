import got from 'got';

const BASE_URL = 'https://api.waifu.im';

export async function getRandomWaifu() {
  const data: any = await got.get(`${BASE_URL}/search`).json();
  console.log(data);
  return data.images[0];
}
