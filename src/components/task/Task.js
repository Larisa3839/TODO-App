import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
  state = {
    done: false
  };

  onCheked = (e) => {
    this.setState(() => {
      return { done: e.target.checked }
    });
  };

  render() {

    const { done } = this.state
    const { id, className, description } = this.props
    let classNames = done ? 'completed' : className
    return (
      <li className={ className === 'editing' ? className : classNames }>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={ this.onCheked }/>
          <label>
            <span className="description">{ description }</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={ () => this.props.onDeleted(id) }></button>
        </div>
        { className === 'editing' && <input type="text" className="edit" defaultValue={ description } />}
      </li>
    );
  }
}
