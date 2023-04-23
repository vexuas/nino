export interface NekosImageV2APISchema {
  data: {
    id: string;
    type: 'image';
    attributes: {
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
        aspectRation: string | null;
      };
      isOriginal: boolean;
      verificationStatus: string;
      ageRating: string;
      timeStamps: {
        created: string;
        updated: string;
      };
    };
    relationships: {
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
          data: { id: string; type: 'likedBy' }[];
          links: { self: string; related: string };
        };
      };
    };
    links: {
      self: 'https://api.nekosapi.com/v2/images/fb07fa64-cc3e-4ee2-a8df-fb905d457996';
    };
  };
  included?: [];
}
