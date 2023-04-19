import got from 'got';
import { WaifuAPI, WaifuSchema } from '../schemas/waifu';

const BASE_URL = 'https://api.waifu.im';

export async function getWaifu(): Promise<WaifuSchema> {
  const response = (await got
    .get(`${BASE_URL}/search?orientation=RANDOM&is_nsfw=FALSE`)
    .json()) as WaifuAPI;
  return response.images[0];
}
