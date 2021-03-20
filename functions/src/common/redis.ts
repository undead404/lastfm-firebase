import { config } from 'firebase-functions';
import Redis from 'ioredis';

const redis = new Redis(config().redis.uri);

export default redis;
