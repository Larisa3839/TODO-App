import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      min: '',
      sec: '',
    }
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.props.onAdd(this.state.value, new Date(0, 0, 0, 0, this.state.min, this.state.sec))
      this.setState({ value: '', min: '', sec: '' })
    }

    //e.preventDefault()
    //this.props.onAdd(this.state.value, new Date(0, 0, 0, 0, this.state.min, this.state.sec))
    //e.target[0].value = ''
  }

  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.handleSubmit}>
        <input
          className="new-todo"
          name="value"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input
          className="new-todo-form__timer"
          name="min"
          value={this.state.min}
          placeholder="Min"
          autoFocus
          onChange={this.handleChange}
        />
        <input
          className="new-todo-form__timer"
          name="sec"
          value={this.state.sec}
          placeholder="Sec"
          autoFocus
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
}
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
}
