import { createClient } from 'redis';

// Create a Redis client
const redis = createClient();

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

