const mongoose = require('mongoose');

const Blog = require('./models/blog');
const User = require('./models/user');

const config = require('../utils/config');
const logger = require('../utils/logger');

mongoose.set('strictQuery', false);
logger.info('Connecting to MongoDB...');

mongoose.connect(config.DB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB: ${error.message}`);
  });

module.exports = {
  Blog,
  User
};