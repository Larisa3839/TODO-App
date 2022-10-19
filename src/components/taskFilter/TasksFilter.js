import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

function TasksFilter({ onFilterChenge }) {
  const filterChenge = (e) => {
    e.currentTarget.childNodes.forEach((li) => {
      if (li.children[0] === e.target) {
        onFilterChenge(e.target.innerText)
        e.target.classList.add('selected')
      } else li.children[0].classList.remove('selected')
    })
  }
  return (
    <ul className="filters" onClick={(e) => filterChenge(e)}>
      <li>
        <button type="button" className="selected">
          All
        </button>
      </li>
      <li>
        <button type="button">Active</button>
      </li>
      <li>
        <button type="button">Completed</button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  onFilterChenge: () => {},
}

TasksFilter.propTypes = {
  onFilterChenge: PropTypes.func,
}

export default TasksFilter
