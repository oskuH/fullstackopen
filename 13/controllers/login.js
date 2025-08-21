const router = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../util/config');

const { Session, User } = require('../models');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id
  };

  const token = jwt.sign(
    userForToken,
    JWT_SECRET
  );

  console.log(`---- ${user.id} ----`);
  await Session.create({ userId: user.id, token });

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;