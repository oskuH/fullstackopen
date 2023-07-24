require('dotenv').config();

const {
  MONGODB_URI, TEST_MONGODB_URI, NODE_ENV, PORT,
} = process.env;

const DB_URI = NODE_ENV === 'test'
  ? TEST_MONGODB_URI
  : MONGODB_URI;

module.exports = {
  DB_URI,
  PORT,
};
