import { Component } from 'react'
import { format } from 'date-fns'
import './Timer.css'

export default class Timer extends Component {
  state = {
    value: new Date(),
  }

  componentDidMount() {
    this.setState({ value: this.props.timer })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.play !== this.props.play && this.props.play !== false) {
      this.interval = setInterval(() => this.tick(), 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  play = (e) => {
    e.stopPropagation()
    this.props.onPlay(true)
  }

  stop = (e) => {
    e.stopPropagation()
    clearInterval(this.interval)
    this.props.onPlay(false)
  }

  tick = () => {
    const value = new Date(this.state.value)
    if (format(value, 'm:ss') === '0:00') {
      clearInterval(this.interval)
      this.props.onPlay(false)
      return
    }
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
}
