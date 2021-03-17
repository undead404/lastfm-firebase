export interface Album {
  artist: string;
  name: string;
  tags: Record<string, number>;
}
export interface AlbumsList {
  albums: Album[] | null;
  createdAt: Date;
}
