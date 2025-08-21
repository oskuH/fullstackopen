const router = require('express').Router();

const middleware = require('../util/middleware');

const { Session } = require('../models');

router.delete('/', middleware.tokenExtractor, async (req, res) => {
  const session = await Session.findOne({ where: { token: req.token } });
  if (session) {
    await session.destroy();
  }
  return res.status(204).end();
});

module.exports = router;