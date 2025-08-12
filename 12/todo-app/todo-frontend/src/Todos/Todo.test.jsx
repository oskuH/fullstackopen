import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Todo from './Todo'

let onClickComplete
let onClickDelete

beforeEach(() => {
  const todo = {
    text: 'Test todo-frontend',
    done: false
  }

  onClickComplete = vi.fn()
  onClickDelete = vi.fn()

  render(<Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />)
})

test('Undone todo is displayed correctly', () => {
  expect(screen.getByText('This todo is not done')).toBeVisible()
  expect(screen.getByRole('button', { name: 'Set as done' })).toBeVisible()
})