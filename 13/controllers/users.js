const router = require('express').Router();

const bcrypt = require('bcrypt');

const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const where = {};

  if (req.query.read === 'true' || req.query.read === 'false') {
    where.read = req.query.read === 'true';
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId', 'id'] }
      },
      {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt']
        },
        through: {
          where,
          attributes: ['id', 'read']
        }
      }
    ]
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'password of length 3+ required' });
    } else if (password.length < 3) {
      return res.status(400).json({ error: 'password must contain at least 3 characters' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username, name, passwordHash });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne(
      {
        where: {
          username: req.params.username
        }
      }
    );
    user.username = req.body.username;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;