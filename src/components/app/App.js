import React, { Component } from 'react';
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList';
import Footer from '../footer'

import './App.css'

export default class App extends Component {
    state = {
        todoData: [
            { id: 1, status: 'active', description: 'Completed task', done: false},
            { id: 2, status: 'active', description: 'Editing task', done: false},
            { id: 3, status: 'active', description: 'Active task', done: false}
        ],
        filter: 'All'
    }

    filterChenge = (filter) => {
        this.setState({ filter })
    }

    clearCompleted = () => {
        this.setState({ todoData: this.state.todoData.filter((item) => !item.done)})
    }

    maxId = 4

    toggleDone = (checked, id) => {
        this.setState( ({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            let newArrData = [ ...todoData ]
            newArrData[index].status = checked ? 'completed' : ''
            newArrData[index].done = checked
            return {
                todoData: newArrData
            }
        } )
    }

    editingTask = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            let copyArrData = [ ...todoData ]
            copyArrData[index].status = 'editing'
            return {
                todoData: copyArrData
            }
        })
    }

    delleteItem = (id) => {
        this.setState({ todoData: this.state.todoData.filter((item) => item.id !== id) })
    }

    addItem = (e) => {
        const newItem = {
            id: this.maxId++,
            status: 'active',
            description: e.target.value,
            done: false
        }

        this.setState(({ todoData }) => {
            const newData = [...todoData, newItem ]
            return {
                todoData: newData
            }
        })

        e.target.value = ''
    }

    saveItem = (text, id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            let copyArrData = [ ...todoData ]
            copyArrData[index].description = text
            copyArrData[index].status = ''
            return {
                todoData: copyArrData
            }
        })
    }
    
    render() {
        const filterNotes = {
            'All': this.state.todoData,
            'Active': this.state.todoData.filter((item) => !item.done),
            'Completed': this.state.todoData.filter((item) => item.done)
        }
        const { filter } = this.state
        const todos = filterNotes[filter]
        const activeCount = this.state.todoData.filter((el) => !el.done).length
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm autoFocus onAdd={ this.addItem }/>
                </header>
                <section className='main'>
                    <TaskList 
                    onDeleted={ this.delleteItem } 
                    todos={ todos }
                    onToggleDone={ this.toggleDone }
                    onEditingTask={ this.editingTask }
                    onSaveItem={ this.saveItem }/>    
                    <Footer onFilterChenge={ this.filterChenge }
                            onClearCompleted={ this.clearCompleted }
                            activeCount={activeCount}/>
                </section>
            </section>
        )
    }   
}

