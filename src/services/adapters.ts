import got from 'got';
import { SearchWaifuAPI, SearchWaifuSchema } from '../schemas/searchWaifu';

const BASE_URL = 'https://api.waifu.im';

export async function getRandomWaifu(): Promise<SearchWaifuSchema> {
  const data = (await got.get(`${BASE_URL}/search`).json()) as SearchWaifuAPI;

  return data.images[0];
}
