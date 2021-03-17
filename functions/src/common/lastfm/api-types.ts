import { ReadonlyDate } from 'readonly-types';

type NameWrapper = {
  readonly name: string;
};

export type Artist = NameWrapper;

export type Album = NameWrapper & {
  readonly artist: Artist;
  mbid?: string;
  playcount: number;
  readonly tags: {
    readonly tag: NameWrapper[];
  };
  readonly wiki: {
    readonly published: string;
  };
};

export type Payload = {
  readonly error?: number;
  readonly message?: string;
};

export type Track = {
  duration: string;
};

export type AlbumInfo = NameWrapper & {
  artist: string;
  listeners: string;
  mbid?: string;
  playcount: string;
  readonly tracks: {
    track: readonly Track[];
  };
};

export type AlbumGetInfoPayload = Payload & {
  readonly album?: AlbumInfo;
};

export type Tag = NameWrapper & {
  readonly count: number;
};

export type AlbumGetTopTagsPayload = Payload & {
  readonly toptags?: {
    '@attr': {
      album: string;
      artist: string;
    };
    readonly tag: readonly Tag[];
  };
};

export type ArtistGetTopAlbumsPayload = Payload & {
  readonly topalbums?: {
    '@attr': {
      artist: string;
      totalPages: string;
    };
    readonly album: readonly Album[];
  };
};

export type ArtistGetTopTagsPayload = Payload & {
  readonly toptags?: {
    '@attr': {
      artist: string;
    };
    readonly tag: readonly Tag[];
  };
};

export type Cached<T> = T & {
  readonly updatedAt: ReadonlyDate;
};

export type CacheItem<T> = {
  data: Cached<T>;
};

export type DefaultParameters = {
  // eslint-disable-next-line camelcase
  readonly api_key: string;
  readonly autocorrect?: '0' | '1';
  readonly format?: 'json' | 'xml';
};

export type LastfmApiMethod =
  | 'album.getInfo'
  | 'album.getTopTags'
  | 'artist.getTopAlbums'
  | 'artist.getTopTags'
  | 'tag.getTopAlbums';

export type Parameters = {
  readonly album?: string;
  readonly artist?: string;
  readonly method: LastfmApiMethod;
  readonly page?: number;
  readonly tag?: string;
};

export type TagGetTopAlbumsPayload = Payload & {
  readonly albums?: {
    readonly '@attr': {
      readonly page: string;
      readonly tag: string;
      readonly totalPages: string;
    };
    readonly album: (NameWrapper & {
      readonly artist: Artist;
      mbid: string;
    })[];
  };
};

export type TagGetTopArtistsPayload = Payload & {
  readonly topartists?: {
    readonly '@attr': {
      readonly page: string;
      tag: string;
      readonly totalPages: string;
    };
    readonly artist: readonly Artist[];
  };
};

export type Weighted<T> = T & {
  readonly weight: number;
};
