import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default class TasksFilter extends Component {
  state = {
    buttons: ['All', 'Active', 'Completed'],
  }

  filterChange = (name) => {
    this.props.onFilterChenge(name)
  }

  render() {
    const { buttons } = this.state

    const filterButtons = buttons.map((el) => {
      const classNames = el === this.props.filter ? 'selected' : ''
      return (
        <li key={el}>
          <button type="button" className={classNames} onClick={() => this.filterChange(el)}>
            {el}
          </button>
        </li>
      )
    })

    return <ul className="filters">{filterButtons}</ul>
  }
}

TasksFilter.defaultProps = {
  onFilterChenge: () => {},
}

TasksFilter.propTypes = {
  onFilterChenge: PropTypes.func,
}
