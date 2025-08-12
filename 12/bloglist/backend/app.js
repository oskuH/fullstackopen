const cors = require('cors');
const express = require('express');
const path = require('path');

require('express-async-errors');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');

const app = express();

const pathToFrontendBuild = path.join(__dirname, '/dist');
app.use(express.static(pathToFrontendBuild));
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

if (process.env.NODE_ENV === 'test' | process.env.NODE_ENV === 'test-local') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
