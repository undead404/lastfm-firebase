import axios from 'axios';
import { logger } from 'firebase-functions';
import isEmpty from 'lodash/isEmpty';
import { stringify } from 'query-string';

import { DEFAULT_PARAMS } from './api/api-constants';
import { Parameters, Payload } from './api/api-types';
import { LASTFM_API_ERRORS, MAX_RETRIES } from './constants';

import sleep from './sleep';

export default async function acquire<T extends Payload>(
  parameters: Parameters,
  retry = 0,
): Promise<T | null> {
  const url = `https://ws.audioscrobbler.com/2.0/?${stringify({
    ...DEFAULT_PARAMS,
    ...parameters,
  })}`;
  logger.warn(url);
  try {
    const response = await axios.get<T>(url, { timeout: 2000 });
    if (isEmpty(response?.data)) {
      throw new Error(response?.data?.message || 'Empty response');
    } else if (response.data.error || isEmpty(response.data)) {
      if (response.data.error === LASTFM_API_ERRORS.INVALID_PARAMETERS) {
        logger.warn(response.data.message);
        return null;
      }
      throw new Error(response.data.message || 'Empty response');
    }
    return response.data;
  } catch (error) {
    logger.error(error);
    if (retry >= MAX_RETRIES) {
      throw error;
    }
    logger.warn(`retry #${retry + 1}`);
    // eslint-disable-next-line no-magic-numbers
    if (process.env.NODE_ENV !== 'test') await sleep(2 ** retry * 1000);
    return acquire<T>(parameters, retry + 1);
  }
}
