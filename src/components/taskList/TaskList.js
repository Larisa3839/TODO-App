import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

const TaskList = (props) => {
  const [state, setState] = useState({
    id: null,
    edit: false,
    description: '',
  })

  const clickEditTask = (id, description) => {
    setState({
      id,
      edit: true,
      description,
    })
  }

  const handleTaskChange = (e) => {
    setState({ ...state, description: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onSaveItem(state.description, state.id)
    setState({ ...state, edit: false })
  }

  const { todos, onDeleted, onToggleDone, updateTimer } = props
  const { id, edit, description } = state

  const elements = todos.map((item) => {
    const classNames = item.done ? 'completed' : ''

    const editForm =
      edit && item.id === id ? (
        <li key={item.id} className="editing">
          <form onSubmit={handleSubmit}>
            <input type="text" className="edit" defaultValue={description} onChange={handleTaskChange} />
          </form>
        </li>
      ) : null

    const task = !editForm ? (
      <li key={item.id} className={classNames}>
        <Task
          {...item}
          updateTimer={updateTimer}
          onDeleted={onDeleted}
          onToggleDone={onToggleDone}
          clickEditTask={clickEditTask}
        />
      </li>
    ) : null

    return editForm || task
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditingTask: () => {},
  onSaveItem: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditingTask: PropTypes.func,
  onSaveItem: PropTypes.func,
}
