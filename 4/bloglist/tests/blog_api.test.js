const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

let userId;
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('fullstack', 10);
  const user = new User({ username: 'root', name: 'Superuser', passwordHash });

  const savedUser = await user.save();

  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'fullstack' });

  userId = savedUser.id;
  token = response.body.token;
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id field is called "id" in returned json', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be created', async () => {
  const newBlog = {
    title: 'ThinkPad Turmoil',
    author: 'Marc Musk',
    url: 'https://lenovolectures.com/',
    userId,
    likes: 9
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain('ThinkPad Turmoil');
});

test('deletion of a blog succeeds with 204 if id is valid', async () => {
  const newBlog = {
    title: 'ThinkPad Turmoil',
    author: 'Marc Musk',
    url: 'https://lenovolectures.com/',
    userId,
    likes: 9
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogs = await helper.blogsInDb();
  const blogToDelete = blogs[helper.initialBlogs.length];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('adding a blog fails with 401 if a token is not provided', async () => {
  const newBlog = {
    title: 'ThinkPad Turmoil',
    author: 'Marc Musk',
    url: 'https://lenovolectures.com/',
    userId,
    likes: 9
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401);
});

describe('updating a blog', () => {
  test('succeeds if all fields are valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdateId = blogsAtStart[0].id;

    const updatedBlog = {
      title: 'ThinkPad Turmoil',
      author: 'Marc Musk',
      url: 'https://lenovolectures.com/',
      likes: 77
    };

    await api
      .put(`/api/blogs/${blogToUpdateId}`)
      .send(updatedBlog);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].title).toEqual(updatedBlog.title);
  });

  test('gives 400 Bad Request when a required field (title) is null', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdateId = blogsAtStart[0].id;

    const updatedBlog = {
      title: null,
      author: 'Marc Musk',
      url: 'https://lenovolectures.com/',
      likes: 77
    };

    await api
      .put(`/api/blogs/${blogToUpdateId}`)
      .send(updatedBlog)
      .expect(400);
  });
});

describe('missing', () => {
  test('likes defaults to the value 0', async () => {
    const newBlog = {
      title: 'ThinkPad Turmoil',
      author: 'Marc Musk',
      url: 'https://lenovolectures.com/'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const addedBlog = blogsAtEnd[helper.initialBlogs.length];
    expect(addedBlog.likes).toEqual(0);
  });

  test('title gives 400 Bad Request', async () => {
    const newBlog = {
      author: 'Marc Musk',
      url: 'https://lenovolectures.com/',
      likes: 77
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('author gives 400 Bad Request', async () => {
    const newBlog = {
      title: 'ThinkPad Turmoil',
      url: 'https://lenovolectures.com/',
      likes: 77
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('when there is initially one user in db', () => {
  test('a missing username gives 400', async () => {
    const newUser = {
      name: 'Oskari',
      password: 'fullstack'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'vohyvo',
      name: 'Oskari',
      password: 'fullstack',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('a non-unique username gives 400', async () => {
    const newUser = {
      username: 'root',
      name: 'Oskari',
      password: 'fullstack',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('a username shorter than 3 characters gives 400', async () => {
    const newUser = {
      username: 'vo',
      name: 'Oskari',
      password: 'fullstack',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('a password shorter than 3 characters gives 400', async () => {
    const newUser = {
      username: 'vohyvo',
      name: 'Oskari',
      password: 'fs',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });

  test('a missing password gives 400', async () => {
    const newUser = {
      username: 'vohyvo',
      name: 'Oskari',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
