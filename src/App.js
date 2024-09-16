import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import Workbench from './Components/Workbench';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="app">
        <Sidebar />
        <Workbench />
        
      </div>
    </div>
  );
}

export default App;
