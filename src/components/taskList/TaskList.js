import React from 'react';
import Task from '../task/Task';
import './TaskList.css'

const TaskList = ({ todos }) => {
    const elements = todos.map((item) => {
        const { id, className, description } = item
        return (
            <li key={ id } className={ className }>
                <Task description={ description }/>
                { className === 'editing' && <input type="text" className="edit" defaultValue={ description } />}
            </li>
        )
    })
    return (
        <ul className='todo-list'>
            { elements }
        </ul>
    )
}

export default TaskList