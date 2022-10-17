/* eslint-disable default-case */
import React from 'react';
import './TasksFilter.css'

const TasksFilter = ({onFilterChenge}) => {

  const filterChenge = (e) => {
    e.currentTarget.childNodes.forEach((li) => {
      if(li.children[0] === e.target) {
        onFilterChenge(e.target.innerText)
        e.target.classList.add('selected')
      } else li.children[0].classList.remove('selected')
    })
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