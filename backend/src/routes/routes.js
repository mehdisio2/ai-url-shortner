import express from 'express';  // Use import instead of require
import { urlShortner,
     urlRedirectToOriginal,
     deleteShortenUrl,
     addNewUser, 
     checkUser,
     smartUrlShortner,
     getUrls } 
     from '../controllers/controller.js';  // Import your controllers using ES Modules
import authenticateToken from '../middleware/jwtVerification.js';
import trackClickMiddleware from '../middleware/trackClickMiddleware.js';

const router = express.Router();

// POST/shorten to accept and shorten a URL
router.post('/api/shorten',authenticateToken, urlShortner);

// GET/getUrls to return all the urls made by a user
router.get('/api/getUrls',authenticateToken, getUrls);

// POST/ai-generated-url
router.post('/api/ai-generated-url',authenticateToken, smartUrlShortner);

// GET/:id to redirect the original URL
router.get('/:id',trackClickMiddleware, urlRedirectToOriginal);

// DELETE/:id to delete a shortened URL
router.delete('/:id',authenticateToken, deleteShortenUrl);

// POST/signup 
router.post('/api/signup', addNewUser);

// POST/login
router.post('/api/login', checkUser);

export default router;  // Use export default to export the router
