const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api-auth', require('./routes/auth'));
app.use('/infosphere', require('./routes/articles'));
app.use('/infosphere', require('./routes/comments'));
app.use('/infosphere', require('./routes/categories'));
app.use('/users', require('./routes/profiles'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notiapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server andando en el puerto ${PORT}`);
});