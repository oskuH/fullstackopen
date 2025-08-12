if (process.env.NODE_ENV === 'development' | process.env.NODE_ENV === 'production-local' | process.env.NODE_ENV === 'test-local') {
  require('dotenv').config();
}

const {
  MONGODB_URI, TEST_MONGODB_URI, NODE_ENV, PORT
} = process.env;

const DB_URI = NODE_ENV === 'test' | 'test-local'
  ? TEST_MONGODB_URI
  : MONGODB_URI;

module.exports = {
  DB_URI,
  PORT
};
