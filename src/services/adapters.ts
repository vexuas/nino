import got from 'got';
import { SearchWaifuAPI, SearchWaifuSchema } from '../schemas/searchWaifu';

const BASE_URL = 'https://api.waifu.im';

export async function getWaifu(): Promise<SearchWaifuSchema> {
  const response = (await got.get(`${BASE_URL}/search`).json()) as SearchWaifuAPI;
  console.log(response);
  return response.images[0];
}
