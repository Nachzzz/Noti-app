const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getProfileData,
  updateProfile
} = require('../controllers/profileController');

const router = express.Router();

router.get('/profiles/profile_data', auth, getProfileData);
router.put('/profiles/:id', auth, upload.single('image'), updateProfile);

module.exports = router;