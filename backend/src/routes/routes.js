import express from 'express';  // Use import instead of require
import { urlShortner,
     urlRedirectToOriginal,
     deleteShortenUrl,
     addNewUser, 
     checkUser,
     smartUrlShortner } 
     from '../controllers/controller.js';  // Import your controllers using ES Modules
import authenticateToken from '../middleware/jwtVerification.js';

const router = express.Router();

// POST/shorten to accept and shorten a URL
router.post('/shorten',authenticateToken, urlShortner);

// POST/ai-generated-url
router.post('/ai-generated-url', authenticateToken, smartUrlShortner);

// GET/:id to redirect the original URL
router.get('/:id',authenticateToken, urlRedirectToOriginal);

// DELETE/:id to delete a shortened URL
router.delete('/:id',authenticateToken, deleteShortenUrl);

// POST/signup 
router.post('/signup', addNewUser);

// POST/login
router.post('/login', checkUser);

export default router;  // Use export default to export the router
