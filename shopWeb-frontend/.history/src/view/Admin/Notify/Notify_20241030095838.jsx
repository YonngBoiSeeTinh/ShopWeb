import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import './Notify.scss'
const Notify = ({ notity, setNotify}) => {
    
    return (
        <div style={{display:notity.length >0 ?"flex":"none"}}>
            <div className="counter" >
                {notity.length}
            </div> 
            <div className="notify"></div>
        </div>
        
     );
}

export default Notify;
