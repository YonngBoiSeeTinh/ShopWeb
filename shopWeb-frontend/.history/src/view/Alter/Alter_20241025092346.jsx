import React from "react";
import './Alter.scss';

const Alter = ({ message, onClose }) => {
    return (
        <div className="alter">
            <div className="alter__overlay" onClick={onClose}></div>
            <div className="alter__content">
                <div className="alter__message">
                    {message}
                </div>
                <button className="alter__button" onClick={onClose}> OK </button>
            </div>
        </div>
    );
};

export default Alter;
