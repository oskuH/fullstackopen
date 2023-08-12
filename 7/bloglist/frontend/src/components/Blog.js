import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComment, addLike, removeBlog } from "../reducers/blogReducer";

const Blog = ({ user, id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(({ blogs }) => blogs);

  if (!blogs) {
    return null;
  }

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const showRemoveButton = {
    display: blog.user.name === user.name ? "" : "none",
  };

  const like = (event) => {
    event.preventDefault();

    const updatedBlog = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    dispatch(addLike(blog.id, updatedBlog));
  };

  const commentBlog = (event) => {
    event.preventDefault();
    const commentObject = { comment: comment };
    dispatch(addComment(blog.id, commentObject));
    setComment("");
  };

  const deleteBlog = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a
          href={`https://${blog.url}`}
          target="blank"
          rel="noopener noreferrer"
        >
          {blog.url}
        </a>
      </div>
      <div className="likes">
        {blog.likes} likes
        <button className="like-button" onClick={like}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <div style={showRemoveButton}>
        <button
          className="remove-button"
          onClick={deleteBlog}
          style={{ color: "white", background: "red" }}
        >
          remove
        </button>
      </div>
      <h3>comments</h3>
      <form onSubmit={commentBlog}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={crypto.randomUUID()}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
