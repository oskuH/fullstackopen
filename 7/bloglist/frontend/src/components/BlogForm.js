import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Table } from "react-bootstrap";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      url: url,
      title: title,
      author: author,
    };

    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "success"
      )
    );

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h3>create new</h3>
      <Table borderless>
        <tbody>
          <tr key={"title-input"}>
            <td>title:</td>
            <td>
              <input
                className="title-input"
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
                placeholder="title"
              />
            </td>
          </tr>
          <tr key={"author-input"}>
            <td>author:</td>
            <td>
              <input
                className="author-input"
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="author"
              />
            </td>
          </tr>
          <tr key={"url-input"}>
            <td>url:</td>
            <td>
              <input
                className="url-input"
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
                placeholder="url"
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <button
        className="blog-submit-button"
        type="submit"
        style={{ color: "white", background: "limegreen" }}
      >
        create
      </button>
    </form>
  );
};

export default BlogForm;
