import express from 'express';  // Use import instead of require
import { urlShortner,
     urlRedirectToOriginal,
     deleteShortenUrl,
     addNewUser, 
     checkUser } 
     from '../controllers/controller.js';  // Import your controllers using ES Modules

const router = express.Router();

// POST/shorten to accept and shorten a URL
router.post('/shorten', urlShortner);

// GET/:id to redirect the original URL
router.get('/:id', urlRedirectToOriginal);

// DELETE/:id to delete a shortened URL
router.delete('/:id', deleteShortenUrl);


// POST/signup 
router.post('/signup', addNewUser);

// POST/login
router.post('/login', checkUser);

export default router;  // Use export default to export the router
