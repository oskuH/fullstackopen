import { Link } from "react-router-dom";

const ListedBlog = ({ blog }) => {
  return (
    <tr key={blog.id}>
      <td>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </td>
      <td>{blog.user.name}</td>
    </tr>
  );
};

export default ListedBlog;
