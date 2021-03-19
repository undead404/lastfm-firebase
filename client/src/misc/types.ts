export interface Album {
  artist: string;
  cover: string | null;
  date: string | null;
  name: string;
  tags: Record<string, number> | null;
  thumbnail: string | null;
}

export interface Tag {
  listCreatedAt: Date | null;
  name: string;
  topAlbums?: Album[] | null;
  power: number;
}
