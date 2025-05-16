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
router.post('/shorten',authenticateToken, urlShortner);

// GET/getUrls to return all the urls made by a user
router.get('/getUrls',authenticateToken, getUrls);

// POST/ai-generated-url
router.post('/ai-generated-url',authenticateToken, smartUrlShortner);

// GET/:id to redirect the original URL
router.get('/:id',trackClickMiddleware, urlRedirectToOriginal);

// DELETE/:id to delete a shortened URL
router.delete('/:id',authenticateToken, deleteShortenUrl);

// POST/signup 
router.post('/signup', addNewUser);

// POST/login
router.post('/login', checkUser);

// GET/OTP genration
router.get('/otp/generate', generateOtp);

// POST/OTP verification
router.post('/otp/verify', verifyOtp)

export default router;  // Use export default to export the router
