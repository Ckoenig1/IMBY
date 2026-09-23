import React from 'react';
import If from './If';
import lineup from '../assets/lineup.jpg';
import campingImage from '../assets/menu-images/camping.jpg';
import beyondTheMusicImage from '../assets/menu-images/beyond-the-music.jpg';
import getInvolvedImage from '../assets/menu-images/get-involved.jpg';
const DropDown = (props) => {
    const select = (section) => props.onSelect(section);
    return(
        <div
            className={"dropdown" + (props.displayType !== "None" ? " open" : "")}
            onMouseLeave={props.onMouseLeave}
        >
                <If condition={props.displayType !== "None"}>
                    <If condition={props.displayType === "Music"}>
                        <button className="dropdown-item" onClick={() => select('music')}>
                            <img className="dropdown-image" src={lineup} alt="Lineup" />
                            <div className="dropdown-text">Lineup</div>
                        </button>
                    </If>
                    <If condition={props.displayType === "Camping & Lodging"}>
                        <button className="dropdown-item" onClick={() => select('tickets')}>
                            <img className="dropdown-image" src={campingImage} alt="Camping & Lodging" />
                            <div className="dropdown-text">Camping & Lodging</div>
                        </button>
                    </If>  
                        <If condition={props.displayType === "Beyond The Music"}>
                        <button className="dropdown-item" onClick={() => select('beyond')}>
                            <img className="dropdown-image" src={beyondTheMusicImage} alt="Beyond The Music" />
                            <div className="dropdown-text">Beyond The Music</div>
                        </button>
                    </If>
                    <If condition={props.displayType === "Get Involved"}>
                        <button className="dropdown-item" onClick={() => select('involved')}>
                            <img className="dropdown-image" src={getInvolvedImage} alt="Get Involved" style={{ objectPosition: 'center 32%' }} />
                            <div className="dropdown-text">Get Involved</div>
                        </button>
                    </If>
                 </If>
            </div>
       
    );
}

export default DropDown