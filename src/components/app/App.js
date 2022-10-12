import React, { Component } from 'react';
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList';
import Footer from '../footer'

import './App.css'

export default class App extends Component {
    state = {
        todoData: [
            { id: 1, className: 'completed', description: 'Completed task', done: false},
            { id: 2, description: 'Editing task', done: false},
            { id: 3, description: 'Active task', done: false}
        ]
    }

    maxId = 4

    toggleDone = (checked, id) => {
        this.setState( ({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            const newItem = { ...todoData[index], className: checked ? 'completed' : '' , done: checked }
            let newArrData = [ ...todoData.slice(0, index), newItem, ...todoData.slice(index+1) ]
            return {
                todoData: newArrData
            }
        } )
    }

    editingTask = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            let copyArrData = [ ...todoData ]
            copyArrData[index].className = 'editing'
            return {
                todoData: copyArrData
            }
        })
    }

    delleteItem = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: todoData.filter((item) => item.id !== id)
            } 
        })
    }

    addItem = (e) => {
        const newItem = {
            id: this.maxId++,
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
        console.log(text, id)
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            let copyArrData = [ ...todoData ]
            copyArrData[index].description = text
            copyArrData[index].className = ''
            return {
                todoData: copyArrData
            }
        })
    }
    
    render() {
        return (
            <section className='todoapp'>
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm autoFocus onAdd={ this.addItem }/>
                </header>
                <section className='main'>
                    <TaskList 
                    onDeleted={ this.delleteItem } 
                    todos={ this.state.todoData }
                    onToggleDone={ this.toggleDone }
                    onEditingTask={ this.editingTask }
                    onSaveItem={ this.saveItem }/>    
                    <Footer />
                </section>
            </section>
        )
    }   
}

