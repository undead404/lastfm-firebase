import map from 'lodash/map';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import getTagList from '../https-callables/get-tag-list';
import { AlbumsList } from '../misc/types';

export interface TagParameters {
  tagName: string;
}

export default function Tag(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { tagName } = useParams<TagParameters>();
  const [error, setError] = useState<Error | undefined>();
  const [albumsList, setAlbumsList] = useState<AlbumsList | undefined>();
  useEffect(() => {
    setIsLoading(true);
    getTagList(tagName)
      .then(setAlbumsList)
      .finally(() => setIsLoading(false))
      .catch(setError);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
