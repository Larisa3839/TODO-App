import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../taskFilter';

import './Footer.css'

const Footer = ({onFilterChenge, onClearCompleted, activeCount}) => {
    return (
        <footer className="footer">
          <span className="todo-count">{activeCount} items left</span>
          <TasksFilter onFilterChenge={onFilterChenge}/>
          <button className="clear-completed" onClick={() => onClearCompleted()}>Clear completed</button>
        </footer>
    )
}

Footer.defaultProps = {
  activeCount: 0,
  onFilterChenge: () => {},
  onClearCompleted: () => {},
}

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  onFilterChenge: PropTypes.func,
  onClearCompleted: PropTypes.func,
}

export default Footer