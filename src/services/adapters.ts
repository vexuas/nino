import got from 'got';
import { compact, find, isEmpty, reduce } from 'lodash';
import { NekosImageAPISchema, NekosImageSchema } from '../schemas/nekos';
import { NekosArtistAPISchema } from '../schemas/nekosV2/artist';
import { NekosCategoryAPISchema } from '../schemas/nekosV2/categories';
import { NekosImageV2APIObject, NekosImageV2Schema } from '../schemas/nekosV2/image';
import { OtakuAPISchema, OtakuReactionsAPISchema } from '../schemas/otaku';
import { WaifuAPISchema, WaifuSchema } from '../schemas/waifu';

export interface IncludedSchema {
  attributes: unknown;
  id: string;
  type: string;
  relationships?: unknown;
  links?: unknown;
}
export const mapRelationship = <T extends IncludedSchema>(
  { data }: { data: { id: string; type: string } | null },
  included?: IncludedSchema[]
): T | null => {
  if (!data || !included) return null;
  const { type, id } = data;
  return find(included, { type, id }) as T;
};
export const mapRelationships = <T extends IncludedSchema>(
  { data }: { data: { id: string; type: string }[] | null },
  included?: IncludedSchema[]
): T[] => {
  if (!data || !included) return [];
  return compact(data.map(({ type, id }) => find(included, { type, id }) as T));
};

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
  //Supported resources: ['uploader', 'artist', 'categories', 'characters', 'liked-by'];
  const included = ['uploader', 'artist', 'categories', 'characters', 'liked-by'];
  const includedQueryString = reduce(
    included,
    (accumulator, value) => {
      return `${accumulator}${isEmpty(accumulator) ? '' : ','}${value}`;
    },
    ''
  );
  //Age Rating filters = 'sfw', 'questionable', 'borderline', 'explicit'
  const response = (await got
    .get(
      `https://api.nekosapi.com/v2/images/random?include=${includedQueryString}&filter[ageRating]=sfw`,
      {
        headers: {
          accept: 'application/vnd.api+json',
        },
      }
    )
    .json()) as NekosImageV2APIObject;

  return nekosImageDecorator(response);
}
function nekosImageDecorator({ data, included }: NekosImageV2APIObject): NekosImageV2Schema {
  const { id, attributes, relationships } = data;
  const uploaderObj = mapRelationship<any>(relationships.uploader, included);
  const uploader = uploaderObj ? { id: uploaderObj.id, ...uploaderObj.attributes } : null;
  const artistObj = mapRelationship<NekosArtistAPISchema>(relationships.artist, included);
  const artist = artistObj ? { id: artistObj.id, ...artistObj.attributes } : null;
  const categories = mapRelationships<NekosCategoryAPISchema>(
    relationships.categories,
    included
  ).map((c: any) => ({
    id: c.id,
    ...c.attributes,
  }));
  const characters = mapRelationships<any>(relationships.characters, included).map((c: any) => ({
    id: c.id,
    ...c.attributes,
  }));
  const likedBy = mapRelationships<any>(relationships.likedBy, included).map((c: any) => ({
    id: c.id,
    ...c.attributes,
  }));
  return {
    id,
    ...attributes,
    categories,
    characters,
    artist,
    uploader,
    likedBy,
  };
}
