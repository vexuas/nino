export interface NekosUserAPIObject {
  data: NekosUserAPISchema;
  included?: any[];
}
export interface NekosUserAPISchema {
  id: string;
  type: 'user';
  attributes: NekosUserAttributes;
  relationships: unknown;
  links: {
    self: string;
  };
}
export interface NekosUserAttributes {
  username: string;
  nickname: string;
  biography: string;
  avatarImage: string;
  timestamps: {
    joined: string;
  };
  permissions: {
    isActive: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
  };
}
export interface NekosUserSchema extends NekosUserAttributes {
  id: string;
}
