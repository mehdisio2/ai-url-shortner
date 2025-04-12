import pg from 'pg'
import dotenv from 'dotenv'
const { Pool } = pg

dotenv.config({ path: '/home/mahdi/Documents/Projects/ai-url-shortner/backend/.env' });  // To load the variables from the .env file


// Create a new client instance
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
 
export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}