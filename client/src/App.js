import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import UserContext from './Context/UserContext';

function App() {
  const test = null;
  return (
    <>
    <UserContext.Provider value={test}>
    <div className="App">
      <Login />
    </div>
    </UserContext.Provider>
    </>
  );
}

export default App;
