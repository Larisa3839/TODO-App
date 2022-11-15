import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = (props) => {
  const [data, setData] = useState({
    value: '',
    min: '',
    sec: '',
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value && name !== 'value' ? value.match(/\d/g).join('') : value,
    })
  }

  const handleSubmit = (e) => {
    if (e.key === 'Enter' && data.value) {
      props.onAdd(data.value, new Date(0, 0, 0, 0, data.min, data.sec))
      setData({ value: '', min: '', sec: '' })
    }
  }

  return (
    <form className="new-todo-form" onKeyDown={handleSubmit}>
      <input
        className="new-todo"
        name="value"
        placeholder="What needs to be done?"
        value={data.value}
        onChange={handleChange}
      />
      <input
        className="new-todo-form__timer"
        name="min"
        type="number"
        max={59}
        value={data.min}
        placeholder="Min"
        autoFocus
        onChange={handleChange}
      />
      <input
        className="new-todo-form__timer"
        name="sec"
        type="number"
        max={59}
        value={data.sec}
        placeholder="Sec"
        autoFocus
        onChange={handleChange}
      />
    </form>
  )
}

export default NewTaskForm
/*export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      min: '',
      sec: '',
    }
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value && name !== 'value' ? value.match(/\d/g).join('') : value })
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter' && this.state.value) {
      this.props.onAdd(this.state.value, new Date(0, 0, 0, 0, this.state.min, this.state.sec))
      this.setState({ value: '', min: '', sec: '' })
    }

    
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
          type="number"
          max={59}
          value={this.state.min}
          placeholder="Min"
          autoFocus
          onChange={this.handleChange}
        />
        <input
          className="new-todo-form__timer"
          name="sec"
          type="number"
          max={59}
          value={this.state.sec}
          placeholder="Sec"
          autoFocus
          onChange={this.handleChange}
        />
      </form>
    )
  }
}*/

NewTaskForm.defaultProps = {
  onAdd: () => {},
}
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
}
