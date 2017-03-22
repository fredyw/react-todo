import React, { Component } from 'react';

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
    if (event.keyCode == 13) {
      this.setState({edit: false});
    }
  }

  render() {
    if (this.state.edit) {
      return <input type="text" value={this.state.title} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
    }
    return <div onClick={this.handleClick}>{this.state.title}</div>
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
}

class TodoApp extends Component {
  render() {
    return (
      <TodoTitle />
    );
  }
}

export default TodoApp;
