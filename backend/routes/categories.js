const express = require('express');
const auth = require('../middleware/auth');
const {
  getCategories,
  createCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', auth, createCategory);
router.post('/article-categories', auth, (req, res) => {
  // Implementation for article-categories relationship
  res.json({ message: 'Article category created' });
});

module.exports = router;