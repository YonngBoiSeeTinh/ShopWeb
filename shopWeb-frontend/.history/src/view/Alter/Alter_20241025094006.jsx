import React from "react";
import './Alter.scss';

const Alter = ({type, message, onClose }) => {
    return (
        <div className={type}>
            <div className="alter__content">
                <div className="alter__message">
                        {message}
                </div>
                <button className="alter__button" onClick={onClose}> X </button>
            </div>
        </div>
    );
};

export default Alter;
