import React, { Component } from "react";

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

export default TodoItem;