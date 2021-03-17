export interface MusicbrainzErrorResponse {
  error: string;
  help: string;
}

export type ReleaseResponse =
  | MusicbrainzErrorResponse
  | {
      date: string;
      'release-group': {
        'first-release-date': string;
      };
    };
