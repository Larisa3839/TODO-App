/* eslint-disable default-case */
import React from 'react';
import './TasksFilter.css'

const TasksFilter = ({onFilterChenge}) => {
  let classNames = ''
  const filterChenge = (e) => {

    switch (e.target.innerText) {
      case 'All': onFilterChenge('All'); break;
      case 'Active': onFilterChenge('Active'); break;
      case 'Completed': onFilterChenge('Completed'); break;
    }

    e.target.classList.add('selected')
  }
    return (
        <ul className="filters" onClick={ (e) => filterChenge(e) }>
            <li>
              <button className="selected">All</button>
            </li>
            <li>
              <button>Active</button>
            </li>
            <li>
              <button>Completed</button>
            </li>
          </ul>
    )
}

export default TasksFilter