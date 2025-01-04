import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
const Notify = ({ notity, setNotify}) => {
    
    return (
        <div className="counter" style={{display:notity.length >0 ?"block":"none"}}>
            4
        </div> 
     );
}

export default Notify;
