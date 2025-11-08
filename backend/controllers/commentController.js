const Comment = require('../models/Comment');

const getComments = async (req, res) => {
  try {
    const { article } = req.query;
    
    let query = {};
    if (article) {
      query.article = article;
    }

    const comments = await Comment.find(query)
      .populate('author', 'username first_name last_name')
      .sort({ createdAt: -1 });

    res.json({
      results: comments,
      count: comments.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createComment = async (req, res) => {
  try {
    const { content, article } = req.body;

    const comment = new Comment({
      content,
      article,
      author: req.user._id
    });

    await comment.save();
    await comment.populate('author', 'username first_name last_name');

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment
};