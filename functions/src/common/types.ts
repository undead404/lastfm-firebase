export interface AlbumRecord {
  artist: string;
  cover?: null | string;
  date?: null | string;
  duration: number | null;
  listeners: number | null;
  mbid: string | null;
  name: string;
  numberOfTracks: number | null;
  playcount: number | null;
  tags: { [name: string]: number } | null;
  thumbnail?: null | string;
}

export interface TagRecord {
  name: string;
  lastProcessedAt: null | Date;
  listCreatedAt: null | Date;
  power: number;
  topAlbums: AlbumRecord[] | null;
}

export type Weighted<T> = T & {
  readonly weight: number;
};

export type SerializableTag = Omit<
  TagRecord,
  'lastProcessedAt' | 'listCreatedAt'
> & {
  lastProcessedAt: null | string;
  listCreatedAt: null | string;
};
