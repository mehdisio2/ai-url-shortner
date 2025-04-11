import { getId } from '../services/services.js';  // Use ES Modules import

// Controller to shorten a URL
export const urlShortner = async (req, res) => {  // Make the function async
  try {
    const { url } = req.body;
    const response = await getId(url);  // Await the result of the async function
    const id = response.rows[0].id;
    console.log(id);
    res.status(201).json({ id });  // Return the shortened URL ID as a response
  } catch (error) {
    console.error('Error in urlShortner controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Controller to redirect to the original URL
export const urlRedirectToOriginal = (req, res) => {
  console.log('urlRedirectToOriginal called');
  // Add logic here to redirect to the original URL using the ID from the shortened URL
  // Example: res.redirect(originalUrl);
}

// Controller to delete a shortened URL
export const deleteShortenUrl = (req, res) => {
  console.log('deleteShortenUrl called');
  // Add logic here to delete the shortened URL from the database
  // Example: res.status(200).send('URL deleted');
}
