export interface NekosArtistAPIObject {
  data: NekosArtistAPISchema;
  included?: any[];
}
export interface NekosArtistAPISchema {
  id: string;
  type: 'artist';
  attributes: NekosArtistAttributes;
  relationships: unknown;
  links: {
    self: string;
  };
}
export interface NekosArtistAttributes {
  name: string;
  aliases: string[];
  imageUrl: string;
  officialLinks: string[];
  timestamps: {
    created: string;
    updated: string;
  };
}
export interface NekosArtistSchema extends NekosArtistAttributes {
  id: string;
}
