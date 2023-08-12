import { useSelector } from "react-redux";

const User = ({ id }) => {
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user || !blogs) {
    return null;
  }

  const userBlogs = blogs.filter((blog) => blog.user.name === user.name);

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
