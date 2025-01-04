import React from "react";
import './Alter.scss'

const Alter =({message,onClose })=>{
    return(
        <div className="alter">
            <div className="message">
                {message}
            </div>
            <button className="button" onClick={onClose}> OK </button>
        </div>
    )
}
export default Alter