import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default class TasksFilter extends Component {
  state = {
    buttons: [
      {
        name: 'All',
        active: true,
      },
      {
        name: 'Active',
        active: false,
      },
      {
        name: 'Completed',
        active: false,
      },
    ],
  }

  filterChange = (name) => {
    const { onFilterChenge } = this.props
    this.setState(({ buttons }) => {
      const newArr = buttons.map((item) => {
        item.active = item.name === name
        return item
      })
      return { buttons: newArr }
    })
    onFilterChenge(name)
  }

  render() {
    const { buttons } = this.state
    const filterButtons = buttons.map((item) => {
      const classNames = item.active ? 'selected' : ''
      return (
        <li key={item.name}>
          <button type="button" className={classNames} onClick={() => this.filterChange(item.name)}>
            {item.name}
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
