export interface SearchWaifuAPI {
  images: SearchWaifuSchema[];
}
export interface SearchWaifuSchema {
  signature: string;
  extension: string;
  image_id: number;
  favorites: number;
  dominant_color: string;
  source: string;
  uploaded_at: string;
  liked_at: null | string;
  is_nsfw: boolean;
  width: number;
  height: number;
  byte_size: number;
  url: string;
  preview_url: string;
  tags: WaifuTagSchema[];
}
export interface WaifuTagSchema {
  tag_id: number;
  name: string;
  description: string;
  is_nsfw: boolean;
}
