const express = require('express');
const auth = require('../middleware/auth');
const {
  getComments,
  createComment,
  deleteComment
} = require('../controllers/commentController');

const router = express.Router();

router.get('/comments', getComments);
router.post('/comments', auth, createComment);
router.delete('/comments/:id', auth, deleteComment);

module.exports = router;