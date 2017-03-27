import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
  }

  handleCheck(index, checked) {
    this.setState((prevState, props) => {
      prevState.items[index].checked = checked;
      return {
        items: prevState.items
      };
    });
  }

  handleEdit(index, task) {
    this.setState((prevState, props) => {
      prevState.items[index].task = task;
      return {
        items: prevState.items
      };
    });
  }

  handleDelete(index) {
    this.setState((prevState, props) => {
      delete prevState.items[index];
      return {
        items: prevState.items
      };
    });
  }

  handleAdd() {
    this.setState((prevState, props) => {
      prevState.items.push({task: "", checked: false});
      return {
        items: prevState.items
      }
    });
  }

  handleDeleteAll() {
    this.props.onDelete(this.props.index);
  }

  render() {
    return (
      <div>
        {this.state.items.map((item, index) => {
          return (
            <TodoItem key={index} item={item} index={index} onCheck={this.handleCheck}
                      onEdit={this.handleEdit} onDelete={this.handleDelete} />
          );
        })}
        <input className="btn btn-primary add-todo-item" type="button" value="Add New Item"
               onClick={this.handleAdd} />
        <input className="btn btn-danger" type="button" value="Delete TODO"
               onClick={this.handleDeleteAll} />
      </div>
    );
  }
}

export default TodoItems;