export interface NekosCategoryAPIObject {
  data: NekosCategoryAPISchema;
  included?: unknown[];
}
export interface NekosCategoryAPISchema {
  id: string;
  type: 'category';
  attributes: NekosCategoryAttributes;
  relationships: unknown;
  links: {
    self: string;
  };
}
export interface NekosCategoryAttributes {
  name: string;
  description: string;
  isNsfw: boolean;
  timestamps: number[];
}
export interface NekosCategorySchema extends NekosCategoryAttributes {
  id: string;
}
