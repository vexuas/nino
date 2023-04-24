//Schemas for the nekosapi API
export interface NekosImageAPISchema {
  data: NekosImageSchema[];
  success: boolean;
}
export interface NekosImageSchema {
  id: string;
  url: string;
  artist: {
    id: string;
    name: string;
    url: string;
    images: number;
  } | null;
  source: {
    name: string | null;
    url: string | null;
  };
  nsfw: boolean;
  original: boolean | null;
  categories: {
    id: string;
    name: string;
    description: string;
    nsfw: boolean;
    createdAt: string;
  }[];
  characters: {
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
  }[];
  createdAt: string;
  meta: {
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
  };
}
