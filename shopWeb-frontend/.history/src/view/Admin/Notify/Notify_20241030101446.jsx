import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './Notify.scss'
const Notify = ({ notity, setNotify}) => {
    
    return (
        <div  className="notify_container" style={{display:notity.length >0 ?"flex":"none"}}>
            <div className="counter" >
                {notity.length}
            </div> 
            <div className="notify">
                {notity.map((notify, index)=>(
                    <div className="notify_item" key = {index}> 
                      <ErrorOutlineIcon/>
                        {notify}
                    </div>
                ))}
            </div>
        </div>
        
     );
}

export default Notify;
