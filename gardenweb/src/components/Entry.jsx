import React from 'react'
import './Entry.css'


const Entry = (props) =>  {
  return (
    <div className="Card">
        {/* feed content */}
        <p className="content">Posted On: {props.time.substring(0,10)}</p>
        <h2 className="title">Entry Title: {props.title}</h2>
    </div>
  );
};

export default Entry;