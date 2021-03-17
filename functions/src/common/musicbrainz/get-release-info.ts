import { ReleaseResponse } from './musicbrainz-types';
import requestMusicbrainz from './request-musicbrainz';

export default function getReleaseInfo(mbid: string): Promise<ReleaseResponse> {
  const url = `https://musicbrainz.org/ws/2/release/${mbid}?fmt=json&inc=release-groups`;
  return requestMusicbrainz<ReleaseResponse>(url);
}
