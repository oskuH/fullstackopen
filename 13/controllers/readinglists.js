const router = require('express').Router();

const middleware = require('../util/middleware');

const { ReadingLists } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const reading = await ReadingLists.create(req.body);
    res.json(reading);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (req, res, next) => {
  try {
    const { user } = req;
    req.readinglist = await ReadingLists.findByPk(req.params.id);
    if (req.readinglist.userId.toString() !== user.id.toString()) {
      return res.status(401).json({ error: 'reading it not from the user\'s own reading list' });
    }
    req.readinglist.read = true;
    await req.readinglist.save();
    return res.json(req.readinglist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;