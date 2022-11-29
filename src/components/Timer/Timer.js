import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './Timer.css'

const Timer = (props) => {
  const [value] = useState(props.timer)
  const [interval, setIntervalTimer] = useState(null)

  useEffect(() => () => clearTimeout(interval), [interval])

  useEffect(() => {
    if (!props.play) setIntervalTimer(clearInterval(interval))
  }, [props.play])

  const play = (e) => {
    e.stopPropagation()
    if (!value.getSeconds() && !value.getMinutes()) return
    props.onPlay(true)
    setIntervalTimer(setInterval(() => tick(), 1000))
  }

  const stop = (e) => {
    e.stopPropagation()
    setIntervalTimer(clearInterval(interval))
    props.onPlay(false)
  }

  const tick = () => {
    const newTime = value.setSeconds(value.getSeconds() - 1)
    props.updateTimer(newTime, props.id)
  }

  const playButton = !props.play && !props.done ? <button className="icon icon-play" onClick={play}></button> : null
  const pauseButton = props.play ? <button className="icon icon-pause" onClick={stop}></button> : null
  return (
    <span className="description">
      {playButton}
      {pauseButton}
      <span>{format(value, 'm:ss')}</span>
    </span>
  )
}

export default Timer
