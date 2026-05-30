import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import cow from './cow.jpg'

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <div className="topbar">
        
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
     

      
         
            <div className='nav-links'>Music</div>
            <div className='nav-links'>Camping & Lodging</div>
            <div className="nav-center">
              <img src={cow} alt="cow" className="center-logo" />
            </div>
            <div className='nav-links'>Beyond The Music</div>
            <div className='nav-links'>Get Involved</div>

          <a className="buy-button" href="#">BUY TICKETS</a>
      
      </div>

      <header className="App-header">
        <img src={cow} style={{ padding: "100px" }} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          IN MY BALLS YUH
        </a>
      </header>
    </div>
  );
}

export default App;
