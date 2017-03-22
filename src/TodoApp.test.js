import React from 'react';
import ReactDOM from 'react-dom';
import TOdoApp from './TodoApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoApp />, div);
});
