import axios from 'axios';
import { CoverArtArchiveResponse } from './cover-art-archive-types';

export default async function getCoverArtInfo(
  mbid: string,
): Promise<CoverArtArchiveResponse | null> {
  try {
    const response = await axios.get<CoverArtArchiveResponse>(
      `https://coverartarchive.org/release/${mbid}`,
    );
    return response.data;
  } catch {
    return null;
  }
}
