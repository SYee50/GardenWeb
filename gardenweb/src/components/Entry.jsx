import React from 'react'
// import { useState } from 'react'
import { Link } from "react-router-dom"
import './Entry.css'


const Entry = (props) =>  {
  return (
    <div className="Card">
        {/* feed content */}
        <p className="content">Posted On: {props.time}</p>
        <h2 className="title">Entry Title: {props.title}</h2>
    </div>
  );
};

export default Entry;