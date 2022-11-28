import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import './Timer.css'

const Timer = (props) => {
  const [value, setValue] = useState(new Date())
  const [interval, setIntervalTimer] = useState(null)

  useEffect(() => setValue(new Date(props.timer)), [])
  useEffect(() => () => clearTimeout(interval), [interval])

  useEffect(() => {
    if (format(value, 'm:ss') === '0:00') {
      setIntervalTimer(clearInterval(interval))
    }
  }, [value])

  useEffect(() => {
    if (!props.play) setIntervalTimer(clearInterval(interval))
  })

  const play = (e) => {
    e.stopPropagation()
    if (format(value, 'm:ss') === '0:00') return
    props.onPlay(true)
    setIntervalTimer(setInterval(() => tick(value), 1000))
  }

  const stop = (e) => {
    e.stopPropagation()
    setIntervalTimer(clearInterval(interval))
    props.onPlay(false)
  }

  const tick = (timeValue) => {
    const newTime = new Date(timeValue.setSeconds(timeValue.getSeconds() - 1))
    setValue(newTime)
    props.updateTimer(newTime, props.id)
  }

  return (
    <span className="description">
      <button className="icon icon-play" onClick={play}></button>
      <button className="icon icon-pause" onClick={stop}></button>
      {format(new Date(value), 'm:ss')}
    </span>
  )
}

export default Timer
