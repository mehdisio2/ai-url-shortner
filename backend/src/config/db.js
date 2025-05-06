import pg from 'pg'
import dotenv from 'dotenv'
const { Pool } = pg

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });  // To load the variables from the .env file


// Create a new client instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
 
export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}