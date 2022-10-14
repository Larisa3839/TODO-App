import React, { Component } from "react";
import "./Task.css";
import {formatDistanceToNow} from 'date-fns'

export default class Task extends Component {

  render() {
    const { id, description, create } = this.props

    return (
        <div className="view">
          <input className="toggle" type="checkbox" onChange={ (e) => this.props.onToggleDone(e.target.checked, id) }/>
          <label>
            <span className="description">{ description }</span>
            <span className="created">{ formatDistanceToNow(create) }</span>
          </label>
          <button className="icon icon-edit" onClick={ (e) => this.props.onEditingTask(id) }></button>
          <button className="icon icon-destroy" onClick={ () => this.props.onDeleted(id) }></button>
        </div>
    );
  }
}
