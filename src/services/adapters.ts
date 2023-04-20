import got from 'got';
import { OtakuReactionsAPISchema } from '../schemas/otaku';
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

export async function getOtakuReactions(): Promise<string[]> {
  const response = (await got
    .get(`https://api.otakugifs.xyz/gif/allreactions`)
    .json()) as OtakuReactionsAPISchema;
  return response.reactions;
}

export async function getOtakuGif(reaction: string) {
  const response = await got
    .get(`https://api.otakugifs.xyz/gif?reaction=${reaction}&format=gif`)
    .json();
  console.log(response);
  return response;
}
