import express from 'express';  // Use import instead of require
import { urlShortner, urlRedirectToOriginal, deleteShortenUrl } from '../controllers/controller.js';  // Import your controllers using ES Modules

const router = express.Router();

// POST/shorten to accept and shorten a URL
router.post('/shorten', urlShortner);

// GET/:id to redirect the original URL
router.get('/:id', urlRedirectToOriginal);

// DELETE/:id to delete a shortened URL
router.delete('/:id', deleteShortenUrl);

export default router;  // Use export default to export the router
