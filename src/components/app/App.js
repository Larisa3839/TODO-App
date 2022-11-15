import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    if (localStorage.data) {
      const data = JSON.parse(localStorage.data)
      setTodoData(data)
    } else localStorage.setItem('data', '')
  }, [])

  useEffect(() => {
    localStorage.data = JSON.stringify(todoData)
  })

  const createItem = (text, date, time) => {
    return {
      id: uuidv4(),
      description: text,
      done: false,
      create: `${date}`,
      timer: time,
    }
  }

  const filterChenge = (filter) => {
    setFilter(filter)
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.done))
  }

  const toggleDone = (id) => {
    const index = todoData.findIndex((item) => item.id === id)
    let newArrData = [...todoData]
    newArrData[index].done = !todoData[index].done
    setTodoData(newArrData)
  }

  const delleteItem = (id) => {
    setTodoData(todoData.filter((item) => item.id !== id))
  }

  const addItem = (text, time) => {
    const newItem = createItem(text, new Date(), time)
    setTodoData([...todoData, newItem])
  }

  const saveItem = (text, id) => {
    const index = todoData.findIndex((item) => item.id === id)
    let copyArrData = [...todoData]
    copyArrData[index].description = text
    setTodoData(copyArrData)
  }

  const updateTimer = (timer, id) => {
    const index = todoData.findIndex((item) => item.id === id)
    let copyArrData = [...todoData]
    copyArrData[index].timer = new Date(timer)
    setTodoData(copyArrData)
  }

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
        <NewTaskForm autoFocus onAdd={addItem} />
      </header>
      <section className="main">
        <TaskList
          onDeleted={delleteItem}
          todos={todos}
          onToggleDone={toggleDone}
          onSaveItem={saveItem}
          updateTimer={updateTimer}
        />
        <Footer
          filter={filter}
          onFilterChenge={filterChenge}
          onClearCompleted={clearCompleted}
          activeCount={activeCount}
        />
      </section>
    </section>
  )
}

export default App
/*export default class App extends Component {
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

  updateTimer = (timer, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id)
      let copyArrData = [...todoData]
      copyArrData[index].timer = new Date(timer)
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
            updateTimer={this.updateTimer}
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
}*/
