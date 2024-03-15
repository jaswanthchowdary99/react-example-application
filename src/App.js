// import logo from './logo.svg';
import './App.css';
import React from 'react';
import TodoList from './todo';
function App() {
  return (
    <div className="App">
     <h1>Todo List</h1>     
     <header className="App-header">
        <TodoList/>
      </header>
    </div>
  );
}
export default App;
