import React, { Component } from "react";
import TodoTitle from "./TodoTitle";
import TodoItems from "./TodoItems";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd() {
    this.setState((prevState, props) => {
      prevState.todos.push({items: []});
      return {
        todos: prevState.todos
      };
    })
  }

  handleDelete(index) {
    this.setState((prevState, props) => {
      delete prevState.todos[index];
      return {
        todos: prevState.todos
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">TODO Application</h1>
        <input className="btn btn-success" type="button" value="Add TODO"
          onClick={this.handleAdd} />
        <p />
        {this.state.todos.map((todo, index) => {
          return (
            <div key={index} className="form-group todo">
              <TodoTitle />
              <p />
              <TodoItems index={index} onDelete={this.handleDelete} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Todo;
