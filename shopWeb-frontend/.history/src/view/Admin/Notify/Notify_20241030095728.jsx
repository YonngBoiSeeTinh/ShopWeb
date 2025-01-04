import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
const Notify = ({ notity, setNotify}) => {
    
    return (
        <div>
            <div className="counter" style={{display:notity.length >0 ?"flex":"none"}}>
                {notity.length}
            </div> 
            <div className="notify"></div>
        </div>
        
     );
}

export default Notify;
