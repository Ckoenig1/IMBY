import React, { useRef, useState } from 'react';
import './App.css';
import cow from './cow.jpg'
import MenuItem from './components/menuItem';
import DropDown from './components/dropDown';
import If from './components/If';
import imbyVideo from './assets/imbyVideo.mp4';
import volumeOff from './assets/volumeOff.svg';
import volumeOn from './assets/volumeOn.svg';

function App() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("None");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleToggleMute = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      try {
        await video.play();
      } catch (error) {
        console.warn('Video play on unmute failed:', error);
      }
    }
  };

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
      <div className="video-container">
        <button
          type="button"
          className="video-unmute-button"
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Unmute video' : 'Mute video'}
        >
          <img
            src={isMuted ? volumeOff : volumeOn}
            alt={isMuted ? 'Muted' : 'Unmuted'}
            className="mute-icon"
          />
        </button>
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          className="background-video"
          onClick={handleToggleMute}
          onCanPlay={() => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          }}
        >
          <source src={imbyVideo} type="video/mp4" />
        </video>
      </div>
      <div className={"body-container"}>
        <div className="body-item" style={{backgroundColor: "hsla(211.11,100%,10.59%,1)", gridArea: "box-1"}}>
          item1
        </div> 
        <div className="body-item" style={{gridArea: "box-2"}}>
          item2
        </div> 
        <div className="body-item" style={{gridArea: "box-3"}}>
          item3
        </div> 
        <div className="body-item" style={{gridArea: "box-4"}}>
          item4
        </div> 
        <div className="body-item" style={{gridArea: "box-5"}}>
          item5
        </div> 
        <div className="body-item" style={{gridArea: "box-6"}}>
          item6
        </div> 
        <div className="body-item" style={{gridArea: "box-7"}}>
          item7
        </div> 
        <div className="body-item" style={{gridArea: "box-8"}}>
          item8
        </div>
        <div className="body-item" style={{gridArea: "box-9"}}>
          item9
        </div> 
        <div className="body-item" style={{gridArea: "box-10"}}>
          item10
        </div>
      </div>
    </div>
  );
}

export default App;
