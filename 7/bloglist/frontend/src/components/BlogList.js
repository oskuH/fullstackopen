import { useDispatch, useSelector } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogReducer";
import { Table } from "react-bootstrap";
import ListedBlog from "./ListedBlog";

const BlogList = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const updateBlog = (id, blogObject) => dispatch(addLike(id, blogObject));
  const deleteBlog = (id) => dispatch(removeBlog(id));

  return (
    <div>
      <Table striped bordered>
        <tbody>
          {sortedBlogs.map((blog) => (
            <ListedBlog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              user={user}
              deleteBlog={deleteBlog}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
