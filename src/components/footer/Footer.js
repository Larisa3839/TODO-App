import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TaskFilter'

import './Footer.css'

function Footer({ onFilterChenge, onClearCompleted, activeCount, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter onFilterChenge={onFilterChenge} filter={filter} />
      <button type="button" className="clear-completed" onClick={() => onClearCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  onFilterChenge: () => {},
  onClearCompleted: () => {},
}

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  onFilterChenge: PropTypes.func,
  onClearCompleted: PropTypes.func,
}

export default Footer
