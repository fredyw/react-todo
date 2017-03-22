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
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleClick() {
    this.setState({edit: true});
  }

  handleChange(event) {
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
        onChange={this.handleChange} onKeyUp={this.handleKeyUp}
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, checked) {
    this.setState((prevState, props) => {
      prevState.items[index].checked = checked;
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
            <TodoItem key={index} item={item} index={index} onChange={this.handleChange} />
          );
        })}
      </div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.index, event.target.checked);
  }

  render() {
    let label = this.props.item.task;
    if (this.props.item.checked) {
      label = <strike>{label}</strike>;
    }
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" name="item" value={this.props.id}
            checked={this.props.item.checked}
            onChange={this.handleChange} />{label}
        </label>
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
