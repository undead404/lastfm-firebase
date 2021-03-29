export interface Album {
  artist: string;
  cover?: string | null;
  date?: string | null;
  duplicateOf?: string;
  id: string;
  name: string;
  tags: Record<string, number> | null;
  thumbnail?: string | null;
}

export interface Tag {
  lastProcessedAt: Date | null;
  listCreatedAt: Date | null;
  name: string;
  topAlbums?: Album[] | null;
  power: number;
}
export type SerializableTag = Omit<
  Tag,
  'lastProcessedAt' | 'listCreatedAt' | 'topAlbums'
> & {
  lastProcessedAt: null | string;
  listCreatedAt: null | string;
  topAlbums?: Album[] | null;
};
