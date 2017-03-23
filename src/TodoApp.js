import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">TODO Application</h1>
        <div className="form-group">
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
    return <b onClick={this.handleClick}>{this.state.title}</b>
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
        checked: false
      }
    ]};
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleCheck(index, checked) {
    this.setState((prevState, props) => {
      prevState.items[index].checked = checked;
      return {
        item: prevState.items
      };
    });
  }

  handleEdit(index, task) {
    this.setState((prevState, props) => {
      prevState.items[index].task = task;
      return {
        item: prevState.items
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.items.map((item, index) => {
          return (
            <TodoItem key={index} item={item} index={index} onCheck={this.handleCheck}
              onEdit={this.handleEdit} />
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

  render() {
    let task = this.props.item.task;
    let label =
      <div>
        <span onClick={this.handleClick}>{task}</span>
        <i id="delete-item" className="fa fa-trash" aria-hidden="true"></i>
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
            <i id="delete-item" className="fa fa-trash" aria-hidden="true"></i>
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
