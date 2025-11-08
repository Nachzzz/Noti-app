const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle
} = require('../controllers/articleController');

const router = express.Router();

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.post('/articles', auth, upload.single('image'), createArticle);
router.delete('/articles/:id', auth, deleteArticle);

module.exports = router;