export interface NekosCharacterAPIObject {
  data: NekosCharacterAPISchema;
  included?: any[];
}
export interface NekosCharacterAPISchema {
  id: string;
  type: 'character';
  attributes: NekosCharacterAttributes;
  relationships: unknown;
  links: {
    self: string;
  };
}
export interface NekosCharacterAttributes {
  name: {
    first: string;
    last: string;
    aliases: string[];
  };
  description: string;
  gender: string;
  species: string;
  ages: number[];
  birthDate: string;
  nationality: string;
  occupations: string[];
  timestamps: {
    created: string;
    updated: string;
  };
}
export interface NekosCharacterSchema extends NekosCharacterAttributes {
  id: string;
}
