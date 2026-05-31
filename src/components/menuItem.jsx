import React from 'react';
import chevron_down from '../pics/chevron_down.svg'

const MenuItem = (props) => {
  return (
     <div className='nav-links' onMouseEnter={props.onHover}>
        <div>
            {props.label}
        </div>
        <img src={chevron_down} alt="chevron down" className="chevronDown" />
     </div>
  );
};

export default MenuItem;
