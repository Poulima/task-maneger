import React, { Component } from 'react';
import AddList from './AddList';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { TaskManeger } from './style';

class App extends Component {
  render() {
    return (
      <TaskManeger>
        <h3 className="header">Task Maneger</h3>
        <AddList />
      </TaskManeger>
    );
  }
}

export default App;
