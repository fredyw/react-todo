import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">TODO Application</h1>
        <div className="form-group todo">
          <TodoTitle />
          <TodoItems />
        </div>
      </div>
    );
  }
}

class TodoTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {title: "No Title", edit: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleClick() {
    this.setState({edit: true});
  }

  handleEdit(event) {
    this.setState({title: event.target.value});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.setState({edit: false});
    }
  }

  render() {
    if (this.state.edit) {
      return <input type="text" value={this.state.title}
        onChange={this.handleEdit} onKeyUp={this.handleKeyUp}
        className="form-control" />
    }
    return <b className="todo-title" onClick={this.handleClick}>{this.state.title}</b>
  }
}

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [
      {
        task: "Learn JavaScript",
        checked: true
      },
      {
        task: "Learn React",
        checked: true
      },
      {
        task: "Building TODO application",
        checked: false
      }
    ]};
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  render() {
    return (
      <div>
        {this.state.items.map((item, index) => {
          return (
            <TodoItem key={index} item={item} index={index} onCheck={this.handleCheck}
              onEdit={this.handleEdit} onDelete={this.handleDelete} />
          );
        })}
      </div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
    this.handleCheck = this.handleCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    if (event.keyCode === 13) {
      this.setState({edit: false});
    }
  }

  handleDelete() {
    this.props.onDelete(this.props.index);
  }

  render() {
    let task = this.props.item.task;
    let del = <i className="fa fa-trash delete-todo-item" aria-hidden="true"
      onClick={this.handleDelete}></i>;
    let label =
      <div>
        <span onClick={this.handleClick}>{task}</span>
        {del}
      </div>;

    if (this.state.edit) {
      label = <input type="text" value={task}
        onChange={this.handleEdit} onKeyUp={this.handleKeyUp}
        className="form-control" />
    } else {
      if (this.props.item.checked) {
        label =
          <div>
            <strike><span onClick={this.handleClick}>{task}</span></strike>
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
