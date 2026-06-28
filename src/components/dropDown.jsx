import React from 'react';
import If from './If';
import lineup from '../assets/lineup.jpg';
const DropDown = (props) => {
    return(
        <div
            className={"dropdown" + (props.displayType != "None" ? " open" : "")}
            onMouseLeave={props.onMouseLeave}
        >
                <If condition={props.displayType != "None"}>
                    <If condition={props.displayType == "Music"}>
                        <div className="dropdown-item">
                            <img className="dropdown-image" src={lineup} alt="Lineup" />
                            <div className="dropdown-text">Lineup</div>
                        </div>
                          <div className="dropdown-item">
                            <img className="dropdown-image" src={lineup} alt="Lineup" />
                            <div className="dropdown-text">Schedule</div>
                        </div>
                    </If>
                    <If condition={props.displayType == "Camping & Lodging"}>
                        <div className="dropdown-item">
                            <img className="dropdown-image" src={lineup} alt="Camping & Lodging" />
                            <div className="dropdown-text">Camping & Lodging</div>
                        </div>
                    </If>  
                        <If condition={props.displayType == "Beyond The Music"}>
                        <div className="dropdown-item">
                            <img className="dropdown-image" src={lineup} alt="Beyond The Music" />
                            <div className="dropdown-text">Beyond The Music</div>
                        </div>
                    </If>
                    <If condition={props.displayType == "Get Involved"}>
                        <div className="dropdown-item">
                            <img className="dropdown-image" src={lineup} alt="Get Involved" />
                            <div className="dropdown-text">Get Involved</div>
                        </div>
                    </If>
                 </If>
            </div>
       
    );
}

export default DropDown