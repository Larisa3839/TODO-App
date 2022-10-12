import React from 'react';
import './NewTaskForm.css'

const NewTaskForm = ({ onAdd }) => {
    return (
        <input className='new-todo' placeholder="What needs to be done?" 
        onKeyDown={(e) => {
            if (e.key === "Enter") onAdd(e);
          }} />
    )
}

export default NewTaskForm