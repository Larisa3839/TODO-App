import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onAdd(this.state.value)
    e.target[0].value = ''
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          defaultValue={this.state.value}
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
