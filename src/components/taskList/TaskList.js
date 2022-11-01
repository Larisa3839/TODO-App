import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

export default class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      edit: false,
      description: '',
    }

    this.handleTaskChange = this.handleTaskChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  clickEditTask = (id, description) => {
    this.setState({
      id,
      edit: true,
      description,
    })
  }

  handleTaskChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, description } = this.state
    const { onSaveItem } = this.props
    onSaveItem(description, id)
    this.setState({ edit: false })
  }

  render() {
    const { todos, onDeleted, onToggleDone, updateTimer } = this.props
    const { id, edit, description } = this.state

    const elements = todos.map((item) => {
      const classNames = item.done ? 'completed' : ''

      const editForm =
        edit && item.id === id ? (
          <li key={item.id} className="editing">
            <form onSubmit={this.handleSubmit}>
              <input type="text" className="edit" defaultValue={description} onChange={this.handleTaskChange} />
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
            clickEditTask={this.clickEditTask}
          />
        </li>
      ) : null

      return editForm || task
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
