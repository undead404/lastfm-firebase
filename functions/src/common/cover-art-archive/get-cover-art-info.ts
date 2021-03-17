import axios from 'axios';
import { CoverArtArchiveResponse } from './cover-art-archive-types';

export default async function getCoverArtInfo(
  mbid: string,
): Promise<CoverArtArchiveResponse> {
  const response = await axios.get(
    `http://coverartarchive.org/release/${mbid}`,
  );
  return response.data;
}
