import React from "react";
import './footer.css'
class Footer extends React.Component {
    render() {
        return (
        <div>
            <div id="alert">
                <span id="closebtn">&times;</span> 
            </div>

            <div className="copy-right"> 
                <p>
                    <a href="index.html">Gud Phone Store</a> - All rights reserved © 2024 - Designed by
                    <span style={{ color: '#eee', fontWeight: 'bold' }}> group 13th</span> 
                </p>
            </div>
        </div>
        );
    }
}

export default Footer;
