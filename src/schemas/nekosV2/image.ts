export interface NekosImageV2APIObject {
  data: NekosImageV2APISchema;
  included?: any[]; //TODO: Add each included resource schema here
}
export interface NekosImageV2APISchema {
  id: string;
  type: 'image';
  attributes: NekosImageV2AttributeSchema;
  relationships: NekosImageV2RelationshipSchema;
  links: {
    self: string;
  };
}
export interface NekosImageV2AttributeSchema {
  file: string;
  title: string;
  colors: {
    dominant: string | null;
    palette: string[];
  };
  source: {
    name: string | null;
    url: string | null;
  };
  dimens: {
    height: number;
    width: number;
    aspectRatio: string | null;
    orientation: string;
  };
  isOriginal: boolean;
  verificationStatus: string;
  ageRating: string;
  timestamps: {
    created: string;
    updated: string;
  };
  metadata: {
    mimetype: string;
    fileSize: number;
  };
}
export interface NekosImageV2RelationshipSchema {
  uploader: {
    data: { id: string; type: 'user' } | null;
    links: { self: string; related: string };
  };
  artist: {
    data: { id: string; type: 'artist' } | null;
    links: { self: string; related: string };
  };
  categories: {
    meta: {
      count: number;
    };
    data: { id: string; type: 'categories' }[];
    links: { self: string; related: string };
  };
  characters: {
    meta: {
      count: number;
    };
    data: { id: string; type: 'characters' }[];
    links: { self: string; related: string };
  };
  likedBy: {
    meta: {
      count: number;
    };
    data: { id: string; type: 'likedBy' }[];
    links: { self: string; related: string };
  };
}
//TODO: Add schemas for all these resources
export interface NekosImageV2Schema extends NekosImageV2AttributeSchema {
  id: string;
  categories: any[];
  artist: any | null;
  uploader: any;
  characters: any[];
  likedBy: any[];
}
