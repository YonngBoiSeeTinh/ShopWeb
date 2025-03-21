import React, { useState, useEffect }  from "react";
import { useSelector } from 'react-redux';

import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Login from '../User/login';
import SignUp from '../User/register'; // Thêm compo
import { Link,useNavigate } from "react-router-dom";
import CartNum from "./CartNumber";

const Header = ({isSignIn,setIsSignIn,setFilter}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false); // State cho phần đăng ký
   
    const user = useSelector((state) => state.user)
    const navigate = useNavigate();

    
    useEffect(() => {
        if (user && user.name) {
            setIsSignIn(true);
            if (user.isAdmin){
                navigate('/admin');
            } 
        }
     else  {
            setIsSignIn(false);
        }
    }, [user]); // Chạy lại khi user thay đổi

    const handleOpenLogin = () => {
        setShowLogin(true);
        setShowSignUp(false); // Đảm bảo tắt phần đăng ký khi mở đăng nhập
    };
  
    const handleOpenSignUp = () => {
        setShowSignUp(true);
        setShowLogin(false); // Đảm bảo tắt phần đăng nhập khi mở đăng ký
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
        setShowSignUp(false); // Đóng cả hai
    };

   
    const handleClickCart =()=>{
        if (!user.id) {
            alert('Vui lòng đăng nhập để sử dụng dịch vụ');
        }
    }

    const handleSearch = (e) => {
        e.preventDefault(); // Ngăn form submit mặc định
        const searchTerm = document.getElementById('search-box').value;
        setFilter(searchTerm);
        navigate('/')
    }
    const handleClickHome =()=>{
        setFilter("")
        navigate('/')
    }
    return (
        <div className="header-container">
            <div className="header group">
                <div className="logo">
                    <Link to="/"  onClick={handleClickHome}>
                        <img src="http://localhost:3000/img/logo.jpg" alt="Trang chủ Smartphone Store" title="Trang chủ Smartphone Store" /> 
                    </Link>
                </div>
                <div className="content">
                    <div className="search-header" style={{ position: 'relative', left: '162px', top: '1px' }}>
                        <form className="input-search" onSubmit={handleSearch}>
                            <div className="autocomplete">
                                <input id="search-box" name="search" autoComplete="off" type="text" placeholder="Nhập từ khóa tìm kiếm..." />
                                <button type="submit">
                                    <i className="fa fa-search"></i>
                                    Tìm kiếm
                                </button>
                            </div>
                        </form> 
                        <div className="tags">
                            <strong>Từ khóa: </strong>
                        </div>
                    </div> 

                    <div className="tools-member">
                        <div className="member">
                            <Link to="#" onClick={handleOpenLogin}  style={{ display: isSignIn ? 'none' : 'flex' }}>
                                <FontAwesomeIcon icon={faUser} className="fa-user" />
                                <p>Tài khoản</p>              
                            </Link>
                            <Link to={`/userPage`}  style={{ display: isSignIn ? 'flex' : 'none' }}>
                                <FontAwesomeIcon icon={faUser} className="fa-user" />
                                <p>{user.name}</p>              
                            </Link>
                        </div> 

                        <div className="cart">
                        
                            <Link to={user.id ? "/cart" : "#"} onClick={handleClickCart} style={{ display: user.role==="employee" ? 'none' : 'flex' }}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <p>Giỏ hàng</p>    
                                
                            </Link>
                            <Link to={user.id ? "/employeeCart" : "#"} onClick={handleClickCart} style={{ display: user.role==="employee" ? 'flex' : 'none' }}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <p>Giỏ hàng</p>   
                              
                            </Link>
                           
                        </div> 
                       
                    </div>
                </div> 
            </div>

            {showLogin && (
                <div className="overlay">
                    <div className="login-modal">
                        <button className="close-button" onClick={handleCloseLogin}>
                            &times;
                        </button>
                        <Login handleOpenSignUp={handleOpenSignUp} handleCloseLogin={handleCloseLogin} setIsSignIn={setIsSignIn}  />
                    </div>
                </div>
            )}

            {showSignUp && (
                <div className="overlay">
                    <div className="signup-modal">
                        <button className="close-button" onClick={handleCloseLogin}>
                            &times;
                        </button>
                        <SignUp handleOpenLogin={handleOpenLogin} /> {/* Truyền hàm mở đăng nhap */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
