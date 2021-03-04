import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import UserContext from './Context/UserContext';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from "react-router-dom";

function App() {
  const test = null;
  return (
    <>
    <BrowserRouter>
      <Helmet>
        <title>Hyperpro - Login</title>
      </Helmet>
      <UserContext.Provider value={test}>
      <div className="App">
        <Login />
      </div>
      </UserContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
