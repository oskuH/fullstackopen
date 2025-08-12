const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { getAsync, setAsync } = require('./redis')

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

(async () => {
  try {
    let added_todos = await getAsync('added_todos')
    if (!added_todos) {
      await setAsync('added_todos', 0)
    }
  } catch (error) {
    console.error(error)
  }
})()

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
