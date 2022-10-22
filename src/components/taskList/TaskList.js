import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

export default class TaskList extends Component {
  state = {
    id: null,
    edit: false,
    description: null,
  }

  clickEditTask = (id, description) => {
    this.setState({
      id,
      edit: true,
      description,
    })
  }

  onSubmit = (description, id) => {
    const { onSaveItem } = this.props
    onSaveItem(description, id)
    this.setState({ edit: false, description })
  }

  render() {
    const { todos, onDeleted, onToggleDone } = this.props
    const { id, edit, description } = this.state
    const elements = todos.map((item) => {
      const classNames = item.done ? 'completed' : ''
      return (
        <li key={item.id} className={edit && id === item.id ? 'editing' : classNames}>
          <Task {...item} onDeleted={onDeleted} onToggleDone={onToggleDone} clickEditTask={this.clickEditTask} />
          {edit && (
            <input
              type="text"
              className="edit"
              defaultValue={description}
              onKeyDown={(e) => {
                if (e.key === 'Enter') this.onSubmit(e.target.value, item.id)
              }}
            />
          )}
        </li>
      )
    })
    return <ul className="todo-list">{elements}</ul>
  }
}

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
