import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer/Timer'

const Task = (props) => {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (props.done) setPlay(false)
  }, [props.done])

  useEffect(() => {
    if (!props.timer.getSeconds() && !props.timer.getMinutes()) setPlay(false)
  }, [props.timer])

  const onPlay = (bool) => {
    if (!props.done) setPlay(bool)
  }

  const { id, description, timer, create, done, onToggleDone, clickEditTask, onDeleted, updateTimer } = props

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} />
      <label htmlFor={id} onClick={() => onToggleDone(id)}>
        <span className="title">{description}</span>
        <Timer timer={timer} onPlay={onPlay} play={play} id={id} done={done} updateTimer={updateTimer} />
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

export default Task

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
