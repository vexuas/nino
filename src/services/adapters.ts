import got from 'got';
import { find, isEmpty, reduce } from 'lodash';
import { NekosImageAPISchema, NekosImageSchema } from '../schemas/nekos';
import { NekosImageV2APIObject } from '../schemas/nekosV2/image';
import { OtakuAPISchema, OtakuReactionsAPISchema } from '../schemas/otaku';
import { WaifuAPISchema, WaifuSchema } from '../schemas/waifu';

export async function getWaifu(): Promise<WaifuSchema> {
  const response = (await got
    .get(`https://api.waifu.im/search?orientation=RANDOM&is_nsfw=false`)
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
//TODO: Explore what we can do with categories
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
export async function getNekosImageV2() {
  const included = ['uploader', 'artist', 'categories', 'characters', 'liked-by'];
  const includedQueryString = reduce(
    included,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ','}${value}`;
    },
    ''
  );
  //TODO: Figure out how to filter out nsfw stuff
  const response = (await got
    .get(`https://api.nekosapi.com/v2/images/random?include=${includedQueryString}`, {
      headers: {
        accept: 'application/vnd.api+json',
      },
    })
    .json()) as NekosImageV2APIObject;

  return nekosImageDecorator(response);
}
function nekosImageDecorator({ data, included }: NekosImageV2APIObject) {
  const { id, attributes, relationships } = data;
  const uploaderObj = mapRelationship<any>(relationships.uploader, included);
  const uploader = uploaderObj ? { id: uploaderObj.id, ...uploaderObj.attributes } : null;
  return {
    id,
    ...attributes,
    categories: [],
    artist: null,
    uploader,
  };
}
export interface IncludedSchema {
  attributes: { [key: string]: unknown };
  id: string;
  type: string;
}

export const mapRelationship = <T extends IncludedSchema>(
  { data }: { data: { id: string; type: string } | null },
  included?: IncludedSchema[]
): T | null => {
  if (!data || !included) return null;
  const { type, id } = data;
  return find(included, { type, id }) as T;
};
