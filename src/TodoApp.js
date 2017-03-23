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
    let label = this.props.item.task;
    if (this.state.edit) {
      label = <input type="text" value={label}
        onChange={this.handleEdit} onKeyUp={this.handleKeyUp}
        className="form-control" />
    } else {
      if (this.props.item.checked) {
        label = <strike>{label}</strike>;
      }
    }
    return (
      <div className="checkbox">
        {/*<label>*/}
          <input type="checkbox" name="item" value={this.props.id}
            checked={this.props.item.checked}
            onChange={this.handleCheck} />
            
        {/*</label>*/}
        <span onClick={this.handleClick}>{label}</span>
        {/*<i className="fa fa-pencil" aria-hidden="true"></i>*/}
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
