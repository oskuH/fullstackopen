import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const hiddenDetails = { display: showDetails ? 'none' : '' }
  const shownDetails = { display: showDetails ? '' : 'none' }
  const showRemoveButton = { display: blog.user.name === user.name ? '' : 'none' }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const addLike = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1
    }

    await updateBlog(blog.id, updatedBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='hideDetails' style={hiddenDetails}>
        {blog.title} {blog.author}
        <button className='show-details-button' onClick={toggleDetails}>view</button>
      </div>
      <div className='showDetails' style={shownDetails}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleDetails}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div className='likes'>
          likes {blog.likes}
          <button className='like-button' onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showRemoveButton}>
          <button className='remove-button' onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog