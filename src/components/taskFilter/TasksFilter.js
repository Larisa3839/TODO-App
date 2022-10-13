import React from 'react';
import './TasksFilter.css'

const TasksFilter = ({onFilterChenge}) => {
    return (
        <ul className="filters">
            <li>
              <button className="selected" onClick={() => onFilterChenge('All')}>All</button>
            </li>
            <li>
              <button onClick={() => onFilterChenge('Active')}>Active</button>
            </li>
            <li>
              <button onClick={() => onFilterChenge('Completed')}>Completed</button>
            </li>
          </ul>
    )
}

export default TasksFilter