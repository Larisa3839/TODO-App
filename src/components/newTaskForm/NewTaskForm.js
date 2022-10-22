import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    value: '',
  }

  handleChange = (e) => {
    const { onAdd } = this.props
    this.setState({ value: e.target.value })
    if (e.key === 'Enter') {
      onAdd(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    const { value } = this.state
    console.log(value)
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        defaultValue={value}
        onKeyDown={this.handleChange}
      />
    )
  }
}

NewTaskForm.defaultProps = {
  onAdd: () => {},
}
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
}
