import map from 'lodash/map';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import getTagList from '../https-callables/get-tag-list';
import { AlbumsList } from '../misc/types';

export interface TagParameters {
  tagName: string;
}

export default function Tag(): JSX.Element {
  const { tagName } = useParams<TagParameters>();
  const [error, setError] = useState<Error | undefined>();
  const [albumsList, setAlbumsList] = useState<AlbumsList | undefined>();
  useEffect(() => {
    getTagList(tagName).then(setAlbumsList).catch(setError);
  }, []);
  return (
    <div>
      <h2>{tagName}</h2>
      {error && <p>{error}</p>}
      <ol>
        {map(albumsList?.albums, (album) => (
          <li>
            {album.artist} - {album.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
