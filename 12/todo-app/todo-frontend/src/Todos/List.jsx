import React from 'react'

import Todo from './Todo'

import './List.css'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <li className='todo-list'>
      {todos.map(todo => (
        <ol key={todo._id} className='todo-list-item'><Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} /></ol>
      ))}
    </li>
  )
}

export default TodoList
