export interface AlbumRecord {
  artist: string;
  cover: null | string;
  date: null | string;
  duration: number | null;
  listeners: number | null;
  mbid: string | null;
  name: string;
  numberOfTracks: number | null;
  playcount: number | null;
  tags: { [name: string]: number } | null;
  thumbnail: null | string;
}

export interface TagRecord {
  name: string;
  lastProcessedAt: null | Date;
  listCreatedAt: null | Date;
  power: number;
}

export interface AlbumsList {
  albums: AlbumRecord[] | null;
  createdAt: Date;
  name: string;
}
