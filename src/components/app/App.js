import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  state = {
    todoData: [],
    filter: 'All',
  }

  componentDidMount() {
    if (localStorage.data) {
      const data = JSON.parse(localStorage.data)
      this.setState({ todoData: data })
    } else localStorage.setItem('data', '')
  }

  componentDidUpdate() {
    localStorage.data = JSON.stringify(this.state.todoData)
  }

  createItem(text, date, time) {
    return {
      id: uuidv4(),
      description: text,
      done: false,
      create: `${date}`,
      timer: time,
    }
  }

  filterChenge = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState({ todoData: this.state.todoData.filter((item) => !item.done) })
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id)
      let newArrData = [...todoData]
      newArrData[index].done = !todoData[index].done
      return {
        todoData: newArrData,
      }
    })
  }

  delleteItem = (id) => {
    this.setState({ todoData: this.state.todoData.filter((item) => item.id !== id) })
  }

  addItem = (text, time) => {
    const newItem = this.createItem(text, new Date(), time)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  saveItem = (text, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id)
      let copyArrData = [...todoData]
      copyArrData[index].description = text
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
          <h1>todoss</h1>
          <NewTaskForm autoFocus onAdd={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            onDeleted={this.delleteItem}
            todos={todos}
            onToggleDone={this.toggleDone}
            onSaveItem={this.saveItem}
          />
          <Footer
            filter={filter}
            onFilterChenge={this.filterChenge}
            onClearCompleted={this.clearCompleted}
            activeCount={activeCount}
          />
        </section>
      </section>
    )
  }
}
