import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm addBlog={createBlog} />)

  const titleInput = container.querySelector('.title-input')
  const authorInput = container.querySelector('.author-input')
  const urlInput = container.querySelector('.url-input')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Testing React apps')
  await user.type(authorInput, 'React Expert')
  await user.type(urlInput, 'bestreacttips.org')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing React apps')
  expect(createBlog.mock.calls[0][0].author).toBe('React Expert')
  expect(createBlog.mock.calls[0][0].url).toBe('bestreacttips.org')
})