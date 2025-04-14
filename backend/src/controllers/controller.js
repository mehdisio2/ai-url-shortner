import { getId, storeShortUrl } from '../services/services.js';  // Use ES Modules import
import * as db from '../config/db.js'
import * as bcrypt from 'bcrypt'

// Controller to shorten a URL
export const urlShortner = async (req, res) => {  // Make the function async
  try {
    const { url } = req.body;
    const response = await getId(url);  // Await the result of the async function
    const id = response.rows[0].id;
    const short_code = Buffer.from(String(id)).toString('base64'); // hashing the id using base64
    const shortCodeStored = await storeShortUrl(short_code, id);
    
    let shortUrl;
    if(shortCodeStored){
      shortUrl = 'http://localhost:5000/' + short_code;
    }else {
      console.error('unable to store the short_code');
    }
    
    res.status(201).json(shortUrl);  // Return the shortened URL as a response
  } catch (error) {
    console.error('Error in urlShortner controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to redirect to the original URL
export const urlRedirectToOriginal = async (req, res) => {
  try {
    const shortCode = req.params.id;
    const originalUrl = await db.query('SELECT original_url FROM urls WHERE short_code = ($1)', [shortCode]);
    res.redirect(originalUrl.rows[0].original_url);
  } catch (error) {
    console.error("unable to redirect to the original url")
  }


}

// Controller to delete a shortened URL
export const deleteShortenUrl = async (req, res) => {
 try {
  const short_code = req.params.id;
  const urldeleted =  db.query('DELETE FROM urls WHERE short_code = ($1)', [short_code])
  if(urldeleted) res.status(200).send('URL deleted');
} catch (error) {
  console.error('unable to delete URL')
 } 
}

export const addNewUser = async (req, res) => {
  const saltRounds = 10;
  try {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const passwordStored = db.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash])
    if(passwordStored) res.status(200).send('user added succesfully')
  } catch (error) {
    console.error('unable to add user', error)
  }


}

export const checkUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    console.log(password)
    const  {rows}= await db.query('SELECT password FROM users WHERE username = ($1)', [username])
    const hash = rows[0].password;
    console.log(hash);
    const isPassword = await bcrypt.compare(password, hash);
    console.log(isPassword);
    if(isPassword == true){
      res.status(200).send('login succesfully')
    }else{
      res.status(401).send('incorrect password or username')
    }
    
  } catch (error) {
    console.error('unabel to get user', error)
  }

}
 