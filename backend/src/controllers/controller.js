import { getId, storeShortUrl } from '../services/services.js';  // Use ES Modules import
import * as db from '../config/db.js'

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
    console.log(originalUrl);
    res.redirect(originalUrl.rows[0].original_url);
  } catch (error) {
    console.error("unable to redirect to the original url")
  }


}

// Controller to delete a shortened URL
export const deleteShortenUrl = async (req, res) => {
 try {
  const short_code = req.params.id;
  const urldeleted = await db.query('DELETE FROM urls WHERE short_code = ($1)', [short_code])
  res.status(200).send('URL deleted')
} catch (error) {
  console.error('unable to delete URL')
 } 

  // Example: res.status(200).send('URL deleted');
}
