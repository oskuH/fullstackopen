const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../util/config');

const { Blog, Session, User } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  console.log('---' + err.name + '---');
  let message;

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  } else if (err.name === 'SequelizeValidationError') {
    message = err.errors.map(e => e.message).join(', ');
    return res.status(400).json({ error: message });
  } else if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'TypeError') {
    return res.status(404).json({ error: 'resource not found' });
  }

  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.replace('bearer ', '');
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, JWT_SECRET);
  const activeToken = await Session.findOne({ where: { token: req.token } });
  if (!activeToken) {
    return res.status(401).json({ error: 'expired token' });
  }
  if (decodedToken.id) {
    req.user = await User.findByPk(decodedToken.id);
  }
  next();
};

module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor,
  userExtractor
};
