import React, { Component } from 'react';
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList';
import Footer from '../footer'

import './App.css'

export default class App extends Component {
    state = {
        todoData: [
            { id: 1, className: 'completed', description: 'Completed task'},
            {id: 2, className: 'editing', description: 'Editing task'},
            { id: 3, description: 'Active task'}
        ]
    }

    delleteItem = (id) => {
        console.log(id)
        this.setState(({ todoData }) => {
            return {
                todoData: todoData.filter((item) => item.id !== id)
            } 
        })
    }
    
    render() {
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm autoFocus/>
                </header>
                <section className='main'>
                    <TaskList className='todo-list' onDeleted={ this.delleteItem } todos={ this.state.todoData }/>
                    <Footer />
                </section>
            </section>
        )
    }   
}

