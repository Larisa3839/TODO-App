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

NewTaskForm.defaultProps = {
  onAdd: () => {},
}
NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
}
