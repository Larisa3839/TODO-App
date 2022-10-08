import React from 'react';
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList';
import Footer from '../footer'

import './App.css'
const todoData = [
    { id: 1, className: 'completed', description: 'Completed task'},
    {id: 2, className: 'editing', description: 'Editing task'},
    { id: 3, description: 'Active task'}
]
const App = () => {
    return (
        <section className='todoapp'>
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm autoFocus/>
            </header>
            <section className='main'>
                <TaskList className='todo-list' todos={ todoData }/>
                <Footer />
            </section>
        </section>
    )
}

export default App