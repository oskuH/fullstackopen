const _ = require('lodash');

const dummy = () => 1;

const likes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (maxEntry, currentEntry) => (currentEntry.likes > maxEntry.likes
    ? currentEntry
    : maxEntry);

  if (blogs.length !== 0) {
    const maxEntry = blogs.reduce(reducer);

    return (
      {
        title: maxEntry.title,
        author: maxEntry.author,
        likes: maxEntry.likes
      }
    );
  }
  return null;
};

const mostBlogs = (blogs) => {
  if (blogs.length !== 0) {
    const authorCount = _.countBy(blogs, 'author');

    const topAuthor = _.maxBy(Object.entries(authorCount), ([, count]) => count);

    return {
      author: topAuthor[0],
      blogs: topAuthor[1]
    };
  }
  return null;
};

const mostLikes = (blogs) => {
  if (blogs.length !== 0) {
    const blogsByAuthor = _.groupBy(blogs, 'author');

    const authorTotalLikes = _.mapValues(blogsByAuthor, (authorBlogs) => _.sumBy(authorBlogs, 'likes'));

    const authorWithMostLikes = _
      .maxBy(_.entries(authorTotalLikes), ([, authorLikes]) => authorLikes);

    return {
      author: authorWithMostLikes[0],
      likes: authorWithMostLikes[1]
    };
  }
  return null;
};

module.exports = {
  dummy,
  likes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
