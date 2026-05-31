import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import cow from './cow.jpg'
import MenuItem from './components/menuItem';
import DropDown from './components/dropDown';
import If from './components/If';

function App() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("None");
  console.log("dropdownOpen:", dropdownOpen);
  return (
    <div className="App">
      <div className="topContainer">
        <div className={"slideBox" + (dropdownOpen != "None" ? " open" : "")}/>
        <div className="topbar" onMouseLeave={() => setDropdownOpen("None")}>
            
              <div className="nav-left">
                <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
                <MenuItem label="Music" onHover={() => setDropdownOpen("Music")}/>
                <MenuItem label="Camping & Lodging" onHover={() => setDropdownOpen("Camping & Lodging")}/>
              </div>
              <div className="nav-center">
                <img src={cow} alt="cow" className="center-logo" />
              </div>
              <div className="nav-right">
              <MenuItem label="Beyond The Music" onHover={() => setDropdownOpen("Beyond The Music")}/>
              <MenuItem label="Get Involved" onHover={() => setDropdownOpen("Get Involved")}/>
              <a className="buy-button" href="#">BUY TICKETS</a>
              </div>
            
        </div>
        <DropDown displayType={dropdownOpen} />
      </div>
      <header className="App-header">
        <img src={cow} style={{ padding: "100px" }} className="App-logo" alt="logo" />      
      </header>
    </div>
  );
}

export default App;
