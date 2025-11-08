const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

const getProfileData = async (req, res) => {
  try {
    let userProfile = await UserProfile.findOne({ user: req.user._id })
      .populate('user', 'username email first_name last_name');

    if (!userProfile) {
      userProfile = new UserProfile({ user: req.user._id });
      await userProfile.save();
      await userProfile.populate('user', 'username email first_name last_name');
    }

    const profileData = {
      ...userProfile.toObject(),
      username: userProfile.user.username,
      email: userProfile.user.email,
      first_name: userProfile.user.first_name,
      last_name: userProfile.user.last_name,
      user__id: userProfile.user._id
    };

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, first_name, last_name, email, dob, bio } = req.body;

    // Update user data
    await User.findByIdAndUpdate(req.user._id, {
      username,
      first_name,
      last_name,
      email
    });

    // Update profile data
    const updateData = { dob, bio };
    if (req.file) {
      updateData.image = `/uploads/profiles/${req.file.filename}`;
    }

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      updateData,
      { new: true, upsert: true }
    ).populate('user', 'username email first_name last_name');

    const profileData = {
      ...userProfile.toObject(),
      username: userProfile.user.username,
      email: userProfile.user.email,
      first_name: userProfile.user.first_name,
      last_name: userProfile.user.last_name,
      user__id: userProfile.user._id
    };

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfileData,
  updateProfile
};