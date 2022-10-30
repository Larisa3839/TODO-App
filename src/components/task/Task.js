import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer/Timer'

export default class Task extends Component {
  state = {
    play: false,
  }

  onPlay = (bool) => {
    this.setState({ play: bool })
  }

  render() {
    const { id, description, timer, create, done, onToggleDone, clickEditTask, onDeleted } = this.props
    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} />
        <label htmlFor={id} onClick={() => onToggleDone(id)}>
          <span className="title">{description}</span>
          <Timer timer={timer} onPlay={this.onPlay} play={this.state.play} id={id} />
          <span className="description">{formatDistanceToNow(new Date(create))}</span>
        </label>
        <button
          type="button"
          aria-label="edit"
          className="icon icon-edit"
          onClick={() => clickEditTask(id, description)}
        />
        <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </div>
    )
  }
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditingTask: () => {},
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  create: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditingTask: PropTypes.func,
}
