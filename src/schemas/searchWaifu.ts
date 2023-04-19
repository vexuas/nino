export interface SearchWaifuAPI {
  images: {
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
    tags: {
      tag_id: number;
      name: string;
      description: string;
      is_nsfw: boolean;
    }[];
  }[];
}
export interface SearchWaifuSchema {
  signature: string;
  extension: string;
  imageId: number;
  favorites: number;
  dominantColor: string;
  source: string;
  uploadedAt: string;
  likedAt: null | string;
  isNsfw: boolean;
  width: number;
  height: number;
  byteSize: number;
  url: string;
  previewUrl: string;
  tags: {
    tagId: number;
    name: string;
    description: string;
    isNsfw: boolean;
  }[];
}
