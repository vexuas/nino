//Schemas for the nekosapi API
export interface NekosImageAPISchema {
  data: NekosImageSchema[];
  success: boolean;
}
export interface NekosImageSchema {
  id: string;
  url: string;
  artist: NekosArtistSchema | null;
  source: {
    name: string;
    url: string;
  };
  nsfw: boolean;
  categories: NekosCategorySchema[];
  characters: NekosCharacterSchema[];
  createdAt: string;
  meta: NekosImageMeta;
}
export interface NekosArtistSchema {
  id: string;
  name: string;
  url: string;
  images: number;
}
export interface NekosCategorySchema {
  id: string;
  name: string;
  description: string;
  nsfw: boolean;
  createdAt: string;
}
export interface NekosCharacterSchema {
  id: string;
  name: string;
  description: string;
  source: string;
  gender: string;
  ages: number[];
  birth_date: string;
  nationality: string;
  occupations: string[];
  createdAt: string;
}
export interface NekosImageMeta {
  eTag: string;
  size: number;
  mimetype: string;
  color: string;
  expires: string;
  dimens: {
    width: number;
    height: number;
    aspectRatio: string;
    orientation: string;
  };
}
