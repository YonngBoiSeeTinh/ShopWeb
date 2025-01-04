import React from "react";
import './Alter.scss'

const Alter =({message})=>{
    return(
        <div className="alter">
            <div className="message">
                {message}
            </div>
            <button className="button"> OK </button>
        </div>
    )
}
export default Alter