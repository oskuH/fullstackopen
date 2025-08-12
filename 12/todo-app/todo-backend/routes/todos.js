const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  let added_todos = await getAsync('added_todos')
  added_todos = parseInt(added_todos, 10)
  await setAsync('added_todos', added_todos + 1)

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo

  todo.text = req.body.text
  todo.done = req.body.done

  try {
    const updatedTodo = await todo.save()
    res.send(updatedTodo)
  } catch (error) {
    console.error(error)
    res.status(500).send("Error updating todo")
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
