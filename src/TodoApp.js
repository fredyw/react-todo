import React, { Component } from 'react';

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
        <input className="btn btn-primary" type="button" value="Add TODO"
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

class TodoTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: true, title: ""};
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    this.setState({edit: true});
  }

  handleEdit(event) {
    this.setState({title: event.target.value});
  }

  handleKeyUp(event) {
    if (this.state.title.length > 0 && event.keyCode === 13) {
      this.setState({edit: false});
    }
  }

  handleBlur() {
    if (this.state.title.length > 0) {
      this.setState({edit: false});
    }
  }

  render() {
    if (this.state.edit) {
      return <input type="text" value={this.state.title}
        onChange={this.handleEdit} onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        className="form-control"
        placeholder="Enter the title"
        autoFocus />
    }
    return <b className="todo-title" onClick={this.handleClick}>{this.state.title}</b>
  }
}

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

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: this.props.item.task.length === 0};
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleCheck(event) {
    this.props.onCheck(this.props.index, event.target.checked);
  }

  handleClick() {
    this.setState({edit: true});
  }

  handleEdit(event) {
    this.props.onEdit(this.props.index, event.target.value);
  }

  handleKeyUp(event) {
    if (this.props.item.task.length > 0 &&  event.keyCode === 13) {
      this.setState({edit: false});
    }
  }

  handleDelete() {
    this.props.onDelete(this.props.index);
  }

  handleBlur() {
    if (this.props.item.task.length > 0) {
      this.setState({edit: false});
    }
  }

  render() {
    let task = this.props.item.task;
    let del = <i className="fa fa-trash delete-todo-item" aria-hidden="true"
      onClick={this.handleDelete} />;
    let label =
      <div>
        <span onClick={this.handleClick}>{task}</span>
        {del}
      </div>;

    if (this.state.edit) {
      label = <input type="text" value={task}
        onChange={this.handleEdit}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        className="form-control"
        placeholder="Enter the task"
        autoFocus />
    } else {
      if (this.props.item.checked) {
        label =
          <div>
            <span className="strike-through" onClick={this.handleClick}>{task}</span>
            {del}
          </div>;
      }
    }
    return (
      <div className="checkbox">
        <input type="checkbox" name="item" value={this.props.id}
          checked={this.props.item.checked}
          onChange={this.handleCheck} />
        {label}
      </div>
    );
  }
}

class TodoApp extends Component {
  render() {
    return (
      <Todo />
    );
  }
}

export default TodoApp;
