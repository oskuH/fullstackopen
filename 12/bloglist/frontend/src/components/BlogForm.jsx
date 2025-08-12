import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();
    addBlog({
      url: url,
      title: title,
      author: author
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        <h2>create new</h2>
        <label htmlFor="title">title:</label>
        <input
          className="title-input"
          type="text"
          value={title}
          name="Title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          className="author-input"
          type="text"
          value={author}
          name="Author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          className="url-input"
          type="text"
          value={url}
          name="Url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className="blog-submit-button" type="submit">create</button>
    </form>
  );
};

export default BlogForm;