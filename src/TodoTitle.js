import React, { Component } from "react";

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
    let title = null;
    if (this.state.edit) {
      title = <input type="text" value={this.state.title}
                     onChange={this.handleEdit} onKeyUp={this.handleKeyUp}
                     onBlur={this.handleBlur}
                     className="form-control"
                     placeholder="Enter the title"
                     autoFocus />
    } else {
      title = <b className="underline" onClick={this.handleClick}>{this.state.title}</b>
    }
    return (
      <div className="todo-title">
        {title}
      </div>
    );
  }
}

export default TodoTitle;