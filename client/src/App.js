import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import UserContext from './Context/UserContext';
import { Helmet } from 'react-helmet';

function App() {
  const test = null;
  return (
    <>
    <Helmet>
      <title>Hyperpro - Login</title>
    </Helmet>
    <UserContext.Provider value={test}>
    <div className="App">
      <Login />
    </div>
    </UserContext.Provider>
    </>
  );
}

export default App;
