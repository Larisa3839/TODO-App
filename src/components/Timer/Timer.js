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
    if (prevProps.play !== this.props.play) {
      const data = JSON.parse(localStorage.data).map((item) => {
        if (item.id === this.props.id) item.timer = this.state.value
        return item
      })
      localStorage.data = JSON.stringify(data)
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
    this.setState({ value: new Date(value.setSeconds(value.getSeconds() + 1)) })
  }

  render() {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.play}></button>
        <button className="icon icon-pause" onClick={this.stop}></button>
        {format(new Date(this.state.value), 'H:m:ss')}
      </span>
    )
  }
}
