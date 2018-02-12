// react
import React, { Component } from 'react';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import kanban from './reducers/kanban';
// components
import Board from './components/Board';


let store = createStore(kanban);

// ============================================================================ //
class App extends Component{
  render(){
    return (
      <Provider store={ store }>
        <Board />
      </Provider>
    )
  }
}



export default App;
