const router = require('express').Router();

const { Op } = require('sequelize');

const middleware = require('../util/middleware');

const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ];
  };

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  });

  return res.json(blogs);
});

router.get('/:id', middleware.blogFinder, async (req, res) => {
  if (req.blog) {
    console.log(req.blog.toJSON());
    return res.json(req.blog);
  } else {
    return res.status(404).end();
  }
});

router.post('/', middleware.tokenExtractor, middleware.userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.create({ ...req.body, userId: req.user.id });
    return res.json(blog);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res, next) => {
  try {
    const { user } = req;
    const blog = await Blog.findByPk(req.params.id);
    if (blog.userId.toString() !== user.id.toString()) {
      return res.status(401).json({ error: 'user is not the original poster' });
    }
    await blog.destroy();
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', middleware.blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    return res.json(req.blog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;