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
    this.props.onPlay(true, this.state.value)
  }

  stop = (e) => {
    e.stopPropagation()
    clearInterval(this.interval)
    this.props.onPlay(false, this.state.value)
  }

  tick = () => {
    const value = new Date(this.state.value)
    this.setState({ value: new Date(value.setSeconds(value.getSeconds() - 1)) })
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
