import React from "react";
import Task from "../task/Task";
import "./TaskList.css";

const TaskList = ({ todos, onDeleted, onToggleDone, onEditingTask, onSaveItem }) => {
  const elements = todos.map((item) => {
    const classNames = item.status
    return (
      <li key={item.id} className={classNames}>
        <Task {...item} 
            onDeleted={ onDeleted } 
            onToggleDone={ onToggleDone }
            onEditingTask={ onEditingTask }/>
        {classNames === "editing" && (

          <input type="text" className="edit"
            defaultValue={item.description}
            onKeyDown={(e) => {
                if (e.key === "Enter") onSaveItem(e.target.value, item.id);
              }}/>

              ) }
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
