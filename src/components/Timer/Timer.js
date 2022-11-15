import React, { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import './Timer.css'

const Timer = (props) => {
  const [value, setValue] = useState(new Date())
  const [interval, setIntervalTimer] = useState(null)
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = interval
    setValue(new Date(props.timer))
    return () => setIntervalTimer(clearInterval(intervalRef.current))
  }, [])

  useEffect(() => {
    if (format(value, 'm:ss') === '0:00') {
      setIntervalTimer(clearInterval(interval))
    }
  }, [value])

  useEffect(() => {
    if (!props.play) {
      setIntervalTimer(clearInterval(interval))
    }
  })

  const play = (e) => {
    e.stopPropagation()
    props.onPlay(true)
    intervalRef.current = setInterval(() => tick(value), 1000)
    setIntervalTimer(intervalRef.current)
  }

  const stop = (e) => {
    e.stopPropagation()
    setIntervalTimer(clearInterval(interval))
    props.onPlay(false)
  }

  const tick = (timeValue) => {
    const newTime = new Date(timeValue.setSeconds(timeValue.getSeconds() - 1))
    props.updateTimer(newTime, props.id)
    setValue(newTime)
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

/*export default class Timer extends Component {
  state = {
    value: new Date(),
    interval: null,
  }

  componentDidMount() {
    this.setState({ value: new Date(this.props.timer) })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value && format(this.state.value, 'm:ss') === '0:00') {
      this.setState({ interval: clearInterval(this.state.interval) })
    }
    if (prevProps.play !== this.props.play && !this.props.play) {
      this.setState({ interval: clearInterval(this.state.interval) })
    }
  }

  componentWillUnmount() {
    this.setState({ interval: clearInterval(this.state.interval) })
  }

  play = (e) => {
    e.stopPropagation()
    this.props.onPlay(true)
    this.setState({ interval: setInterval(() => this.tick(), 1000) })
  }

  stop = (e) => {
    e.stopPropagation()
    this.setState({ interval: clearInterval(this.state.interval) })
    this.props.onPlay(false)
  }

  tick = () => {
    const value = new Date(this.state.value)
    this.setState(() => {
      const newTime = new Date(value.setSeconds(value.getSeconds() - 1))
      this.props.updateTimer(newTime, this.props.id)
      return {
        value: newTime,
      }
    })
  }

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.play}></button>
        <button className="icon icon-pause" onClick={this.stop}></button>
        {format(new Date(this.state.value), 'm:ss')}
      </span>
    )
  }
}*/
