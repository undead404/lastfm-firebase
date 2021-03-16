import firebase from 'firebase/app';

export interface Album {
  artist: string;
  name: string;
}
export interface AlbumsList {
  albums: Album[] | null;
  createdAt: firebase.firestore.Timestamp;
}
