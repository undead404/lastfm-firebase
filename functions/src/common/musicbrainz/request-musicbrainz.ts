import axios from 'axios';

export default async function requestMusicbrainz<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url, {
    headers: {
      'User-Agent': 'lastfm-analysis/0.1.0 ( brute18@gmail.com )',
    },
  });
  return response.data;
}
