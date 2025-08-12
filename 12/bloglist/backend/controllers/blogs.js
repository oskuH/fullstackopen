const blogsRouter = require('express').Router();

const middleware = require('../utils/middleware');

const { Blog } = require('../mongo');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const {
    title, author, url, likes
  } = request.body;
  const { user } = request;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  await savedBlog.populate('user', { username: 1, name: 1 });

  return response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const {
    title, author, url, likes, user
  } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title,
      author,
      url,
      likes,
      user
    },
    { new: true, runValidators: true }
  );

  response.json(updatedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'user is not the original poster' });
  }
  await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

module.exports = blogsRouter;