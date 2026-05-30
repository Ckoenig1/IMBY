import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import cow from './cow.jpg'
import MenuItem from './components/menuItem';

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
     

      
         
            <MenuItem label="Music" />
            <MenuItem label="Camping & Lodging" />
             <div className="nav-center">
              <img src={cow} alt="cow" className="center-logo" />
            </div>
            <MenuItem label="Beyond The Music" />
            <MenuItem label="Get Involved" />
            
           
            

          <a className="buy-button" href="#">BUY TICKETS</a>
      
      </div>

      <header className="App-header">
        <img src={cow} style={{ padding: "100px" }} className="App-logo" alt="logo" />      
      </header>
    </div>
  );
}

export default App;
