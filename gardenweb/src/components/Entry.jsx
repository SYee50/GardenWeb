import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import './Entry.css'


const Entry = (props) =>  {
  const [display, setDisplay] = useState("none")

  const toggle = () => {
    if (display === "none") {
      setDisplay("block")
    } else {
      setDisplay("none")
    }
  }

  return (
    <div className="Card" onClick={toggle}>
        {/* feed content */}
        <p className="content">Posted On: {props.time}</p>
        <h2 className="title">Entry Title: {props.title}</h2>

        {/* additional content - displayed when user clicks on post*/}
        <div style={{display: display}}>
          <p className="content">{props.description}</p>
          <img className="content" src={props.imgURL} />
          <Link to={"/edit/" + props.id}>
             <button style={{display: "block", margin: "0 0 0 auto"}}> Edit </button>
          </Link>
        </div>
    </div>
  );
};

export default Entry;