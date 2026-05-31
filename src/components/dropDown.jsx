import React from 'react';
import If from './If';
const DropDown = (props) => {
    return(
        

            <div className={"dropdown" + (props.displayType != "None" ? " open" : "")}>
                <If condition={props.displayType != "None"}>
                    <If condition={props.displayType == "Music"}>v
                        <div className="dropdown-item">Music Item 1</div>
                        <div className="dropdown-item">Music Item 2</div>
                        <div className="dropdown-item">Music Item 3</div>
                    </If>
                    <If condition={props.displayType == "Camping & Lodging"}>
                        <div className="dropdown-item">Camping & Lodging Item 1</div>
                    </If>  
                        <If condition={props.displayType == "Beyond The Music"}>
                        <div className="dropdown-item">Beyond The Music Item 1</div>
                    </If>
                    <If condition={props.displayType == "Get Involved"}>
                        <div className="dropdown-item">Get Involved Item 1</div>
                    </If>
                    <div className="dropdown-item">Item 1</div>
                 </If>
            </div>
       
    );
}

export default DropDown