import got from 'got';
import { WaifuAPI, WaifuSchema } from '../schemas/waifu';

const BASE_URL = 'https://api.waifu.im';

interface WaifuProps {
  isGif?: boolean;
}

export async function getWaifu(props?: WaifuProps): Promise<WaifuSchema> {
  const response = (await got
    .get(`${BASE_URL}/search?orientation=RANDOM&is_nsfw=false&gif=${props ? props.isGif : false}`)
    .json()) as WaifuAPI;
  return response.images[0];
}
