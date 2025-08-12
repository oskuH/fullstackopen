import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

let addLike;

beforeEach(() => {
  const blog = {
    title: 'Testing React apps',
    author: 'React Expert',
    url: 'bestreacttips.org',
    likes: 5,
    user: 'Superuser'
  };

  const user = {
    name: 'Superuser'
  };

  addLike = vi.fn();

  render(<Blog blog={blog} user={user} updateBlog={addLike} />).container;
});

test('only title and author are rendered by default', () => {
  expect(screen.getByText('Testing React apps React Expert')).toBeVisible();
  expect(screen.getByText('bestreacttips.org')).not.toBeVisible();
  expect(screen.getByText('likes 5')).not.toBeVisible();
});

test('URL and number of likes are shown when "view" button has been clicked', async () => {
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  expect(screen.getByText('Testing React apps React Expert')).toBeVisible();
  expect(screen.getByText('bestreacttips.org')).toBeVisible();
  expect(screen.getByText('likes 5')).toBeVisible();
});

test('event handler is called twice when the "like" button is clicked twice', async () => {
  const user = userEvent.setup();
  let viewButton = screen.getByText('view');
  await user.click(viewButton);
  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(addLike.mock.calls).toHaveLength(2);
});