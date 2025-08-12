import React from 'react'

const Todo = ({ todo, onClickComplete, onClickDelete }) => {
  const todoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '90%',
    margin: 'auto',
    paddingBottom: '10px'
   }

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )

  return (
    <div className="todo-item" style={todoStyle}>
      <span>
        {todo.text} 
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
}

export default Todo