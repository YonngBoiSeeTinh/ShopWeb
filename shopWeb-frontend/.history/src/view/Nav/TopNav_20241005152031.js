import React from "react";
import { Link } from "react-router-dom";
import './TopNav.css'

class Navigation extends React.Component {
    render() {
        return (
        <div className="top-nav group">
            <section>
                <ul className="top-nav-quicklink flexContain">
                    <li><Link to="/company/apple"> Iphone</Link></li>
                    <li><Link to="/company/xiaomi"> Xiaomi</Link></li>
                    <li><Link to="/company/samsung"> SamSung</Link></li>
                    <li><Link to="/company/oppo"> Oppo</Link></li>
                    <li><Link to="/headphone">Tai nghe, Loa</Link></li>
                    <li><Link to="/accessories"> Phụ Kiện</Link></li>
                    <li><Link to="/new"> Hot News</Link></li>
                    <li><Link to="/takecare"> TopCare  </Link></li>
                </ul> 
            </section>
        </div>
        );
    }
}

export default Navigation;
