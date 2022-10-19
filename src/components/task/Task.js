import React from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import { formatDistanceToNow } from 'date-fns'

function Task({ id, description, create, done, onToggleDone, onEditingTask, onDeleted }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={(e) => onToggleDone(e.target.checked, id)} />
      <label htmlFor={id}>
        <span className="description">{description}</span>
        <span className="created">{formatDistanceToNow(create)}</span>
      </label>
      <button type="button" aria-label="edit" className="icon icon-edit" onClick={() => onEditingTask(id)} />
      <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={() => onDeleted(id)} />
    </div>
  )
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditingTask: () => {},
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  create: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditingTask: PropTypes.func,
}

export default Task
