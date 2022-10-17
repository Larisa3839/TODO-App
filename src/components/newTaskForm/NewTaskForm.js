import React from "react";
import PropTypes from "prop-types";
import "./NewTaskForm.css";

const NewTaskForm = ({ onAdd }) => {
  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={(e) => {
        if (e.key === "Enter") onAdd(e);
      }}
    />
  );
};

NewTaskForm.defaultProps = {
    onAdd: () => {},
};

NewTaskForm.propTypes = {
    onAdd: PropTypes.func,
};

export default NewTaskForm;
