import React from 'react';
import TasksFilter from '../taskFilter';

import './Footer.css'

const Footer = ({onFilterChenge, onClearCompleted}) => {
    return (
        <footer className="footer">
          <span className="todo-count">1 items left</span>
          <TasksFilter onFilterChenge={onFilterChenge}/>
          <button className="clear-completed" onClick={() => onClearCompleted()}>Clear completed</button>
        </footer>
    )
}

export default Footer