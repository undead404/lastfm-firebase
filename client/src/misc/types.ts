export interface Album {
  artist: string;
  cover: string | null;
  date: string | null;
  name: string;
  tags: Record<string, number> | null;
  thumbnail: string | null;
}

export interface Tag {
  lastProcessedAt: Date | null;
  listCreatedAt: Date | null;
  name: string;
  topAlbums?: Album[] | null;
  power: number;
}

export type SerializableTag = Omit<Tag, 'lastProcessedAt' | 'listCreatedAt'> & {
  lastProcessedAt: null | string;
  listCreatedAt: null | string;
};
