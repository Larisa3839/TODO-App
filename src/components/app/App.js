import React, { Component } from 'react'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import Footer from '../footer'

import './App.css'

export default class App extends Component {
  maxId = 1

  createItem(text) {
    return {
      id: this.maxId++,
      status: 'active',
      description: text,
      done: false,
      create: new Date(),
    }
  }

  state = {
    todoData: [this.createItem('Item 1'), this.createItem('Item 2'), this.createItem('Item 3')],
    filter: 'All',
  }

  filterChenge = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState({ todoData: this.state.todoData.filter((item) => !item.done) })
  }

  toggleDone = (checked, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id)
      let newArrData = [...todoData]
      newArrData[index].status = checked ? 'completed' : 'active'
      newArrData[index].done = checked
      return {
        todoData: newArrData,
      }
    })
  }

  editingTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id)
      let copyArrData = [...todoData]
      copyArrData[index].status = 'editing'
      return {
        todoData: copyArrData,
      }
    })
  }

  delleteItem = (id) => {
    this.setState({ todoData: this.state.todoData.filter((item) => item.id !== id) })
  }

  addItem = (e) => {
    const newItem = this.createItem(e.target.value)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      }
    })
    e.target.value = ''
  }

  saveItem = (text, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id)
      let copyArrData = [...todoData]
      copyArrData[index].description = text
      copyArrData[index].status = copyArrData[index].done ? 'completed' : 'active'
      return {
        todoData: copyArrData,
      }
    })
  }

  render() {
    const { todoData, filter } = this.state

    const filterNotes = {
      All: todoData,
      Active: todoData.filter((item) => !item.done),
      Completed: todoData.filter((item) => item.done),
    }

    const todos = filterNotes[filter]
    const activeCount = todoData.filter((el) => !el.done).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm autoFocus onAdd={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            onDeleted={this.delleteItem}
            todos={todos}
            onToggleDone={this.toggleDone}
            onEditingTask={this.editingTask}
            onSaveItem={this.saveItem}
          />
          <Footer onFilterChenge={this.filterChenge} onClearCompleted={this.clearCompleted} activeCount={activeCount} />
        </section>
      </section>
    )
  }
}
