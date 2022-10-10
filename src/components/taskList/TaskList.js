import React from 'react';
import Task from '../task/Task';
import './TaskList.css'

const TaskList = ({ todos, onDeleted }) => {
    const elements = todos.map((item) => {
        return <Task key={ item.id } { ...item } onDeleted={onDeleted}/>
    })
    return (
        <ul className='todo-list'>
            { elements }
        </ul>
    )
}

export default TaskList