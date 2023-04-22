import got from 'got';
import { NekosImageAPISchema, NekosImageSchema } from '../schemas/nekos';
import { OtakuAPISchema, OtakuReactionsAPISchema } from '../schemas/otaku';
import { WaifuAPISchema, WaifuSchema } from '../schemas/waifu';

const BASE_URL = 'https://api.waifu.im';

interface WaifuProps {
  isGif?: boolean;
}

export async function getWaifu(props?: WaifuProps): Promise<WaifuSchema> {
  const response = (await got
    .get(`${BASE_URL}/search?orientation=RANDOM&is_nsfw=false&gif=${props ? props.isGif : false}`)
    .json()) as WaifuAPISchema;
  return response.images[0];
}

export async function getOtakuReactions(): Promise<string[]> {
  const response = (await got
    .get(`https://api.otakugifs.xyz/gif/allreactions`)
    .json()) as OtakuReactionsAPISchema;
  return response.reactions;
}

export async function getOtakuGif(reaction: string): Promise<OtakuAPISchema> {
  const response = (await got
    .get(`https://api.otakugifs.xyz/gif?reaction=${reaction}&format=gif`)
    .json()) as OtakuAPISchema;
  return response;
}

export async function getNekosCategories() {
  const response = await got.get(`https://v1.nekosapi.com/api/category?limit=25&offset=25`).json();
  return response;
}
export async function getNekosImage(): Promise<NekosImageSchema> {
  const response = (await got
    .get(`https://v1.nekosapi.com/api/image/random?limit=1`)
    .json()) as NekosImageAPISchema;
  return response.data[0];
}
