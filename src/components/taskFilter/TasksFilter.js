import PropTypes from 'prop-types'
import './TasksFilter.css'

const TasksFilter = (props) => {
  const buttons = ['All', 'Active', 'Completed']
  const filterChange = (name) => {
    props.onFilterChenge(name)
  }

  const filterButtons = buttons.map((el) => {
    const classNames = el === props.filter ? 'selected' : ''
    return (
      <li key={el}>
        <button type="button" className={classNames} onClick={() => filterChange(el)}>
          {el}
        </button>
      </li>
    )
  })

  return <ul className="filters">{filterButtons}</ul>
}

export default TasksFilter

TasksFilter.defaultProps = {
  onFilterChenge: () => {},
}

TasksFilter.propTypes = {
  onFilterChenge: PropTypes.func,
}
