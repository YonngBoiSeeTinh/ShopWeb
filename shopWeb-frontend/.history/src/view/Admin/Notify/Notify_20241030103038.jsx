import React,{useState} from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './Notify.scss'
const Notify = ({ notity, setNotify}) => {
    
    return (
        <div  className="notify_container" style={{display:notity.length >0 ?"flex":"none"}}>
            <div className="counter" >
                {notity.length}
            </div> 
            <div className="notify">
                {notity ? notity.map((notify, index)=>(
                    <div className="notify_item" key = {index}> 
                      <ErrorOutlineIcon/>
                        {notify}
                    </div>
                )) : 
                <div>Loading...</div>
                }
            </div>
        </div>
        
     );
}

export default Notify;
