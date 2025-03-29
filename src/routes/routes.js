const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller')

// POST/shorten to accept and shorten a URL
router.post('/shorten', controller.urlShortner);

//GET/:id to redirect the original URL
router.get('/:id', controller.urlRedirectToOriginal);

//DELETE/:id to delete a shortened URL
router.delete('/:id', controller.deleteShortenUrl);

module.exports = router;