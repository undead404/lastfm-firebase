import map from 'lodash/map';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getProcessedTagNames from '../https-callables/get-processed-tag-names';

export default function Home(): JSX.Element {
  const [error, setError] = useState<Error | undefined>();
  const [tagNames, setTagNames] = useState<string[]>([]);
  useEffect(() => {
    getProcessedTagNames().then(setTagNames).catch(setError);
  }, []);
  return (
    <div>
      {error && <p>{error.message}</p>}
      <p>
        {map(tagNames, (tagName) => (
          <Link to={`/tag/${tagName}`}>{tagName}</Link>
        ))}
      </p>
    </div>
  );
}
