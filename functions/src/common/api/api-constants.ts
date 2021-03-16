import environment from '../environment';
import { DefaultParameters } from './api-types';

// eslint-disable-next-line import/prefer-default-export
export const DEFAULT_PARAMS: DefaultParameters = {
  api_key: environment.LASTFM_API_KEY,
  autocorrect: '1',
  format: 'json',
};
