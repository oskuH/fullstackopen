const express = require('express');
const app = express();

const { connectToDatabase } = require('./util/db');
const middleware = require('./util/middleware');
const { PORT } = require('./util/config');

const authorsRouter = require('./controllers/authors');
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const readinglistsRouter = require('./controllers/readinglists');
const usersRouter = require('./controllers/users');

app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/readinglists', readinglistsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();