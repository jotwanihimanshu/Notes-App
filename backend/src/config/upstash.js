 import{ Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimiter = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '20 s'), 
    });

export { redis, ratelimiter }; 