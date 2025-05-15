import { createClient } from 'redis';
import dotenv from 'dotenv'

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });

console.log(process.env.REDIS_URL)
// Create a Redis client
const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('reconnecting', () => {
  console.log('Reconnecting to Redis');
});

redis.on('end', () => {
  console.log('Redis connection closed');
});

// Set up error handling
redis.on('error', (err) => {
  console.error('Redis error:', err);
});

// Async function to connect to Redis
const connectRedis = async () => {
  try {
    await redis.connect();
    console.log('Redis connected');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
};

// Export the redis client and the connect function
export { redis, connectRedis };

