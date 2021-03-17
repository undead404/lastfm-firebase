export interface CoverArtArchiveResponse {
  images: {
    image: string;
    thumbnails: {
      '250': string;
      large: string;
    };
    types: string[];
  }[];
}
