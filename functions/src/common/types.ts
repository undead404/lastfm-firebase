import { firestore } from 'firebase-admin';

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

export interface TagAlbumsList {
  albums: {
    artist: string;
    name: string;
  }[];
  tagName: string;
}
export interface TagRecord {
  name: string;
  lastProcessedAt: null | firestore.Timestamp | firestore.FieldValue;
  listCreatedAt: null | firestore.Timestamp | firestore.FieldValue;
  power: number | firestore.FieldValue;
}

export interface TagsList {
  albums: AlbumRecord[] | null;
  createdAt: firestore.FieldValue | firestore.Timestamp;
  name: string;
}
