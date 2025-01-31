import React,{useEffect} from "react";
import './Alter.scss';

const Alter = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        // Dọn dẹp timer khi component unmount
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={`alter ${type}`}>
           
                <div className="alter__message">
                    {message}
                </div>
                <button className="alter__button" onClick={onClose}> X </button>
            
        </div>
    );
};

export default Alter;
