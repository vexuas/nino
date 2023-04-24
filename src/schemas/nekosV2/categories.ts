//Update the untyped keys below eventually; only typed some here since they're used as a related resource in images
export interface NekosCategoryAPIObject {
  data: NekosCategoryAPISchema;
  included?: any[];
}
export interface NekosCategoryAPISchema {
  id: string;
  type: 'category';
  attributes: NekosCategoryAttributes;
  relationships: any;
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
