import React from "react";
import './userPage.css';
import { logout } from "../../Service/UserService";
import {resetUser} from "../../Redux/sliders/userSlide"
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function UserPage ({setIsSignIn}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = async()=>{
        await logout();
        dispatch(resetUser()) 
        setIsSignIn(false);
        navigate('/');
    }

    const user = useSelector((state) => state.user)

    return(
        <div style = {{margin:'40px'}}>
            <div className="user-page">
                <div className="user-profile">
                    <div className="avatar-section">
                        <img src="https://via.placeholder.com/150" alt="User Avatar" className="user-avatar"/>
                    </div>
                    <div className="user-info">
                        <h1 className="user-name">{user.name}</h1>
                        <p className="user-email">{user.email}</p>
                      
                        <div className="user-action">
                            <button className="edit-profile-btn">Chỉnh sửa tài khoản</button>
                            <button className="logout-btn"
                             onClick={() => handleLogOut()}
                            >
                                Đăng xuất
                                
                            </button>
                        </div>
                       
                    </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                    <div className="account-table">
                        <div className="account-table_row">
                            <div className="table_row-header" >Ngày tạo tài khoản:</div>
                            <div className="table_row-infor">01/01/2023</div>
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            <input className="table_row-infor">{user.phone}</input>
                        </div >
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            <input className="table_row-infor">{user.adress || ""}"</input>
                        </div>
                        <div className="account-table_row"> 
                            <div className="table_row-header"> Số đơn hàng đã thực hiện:</div>
                            <div className="table_row-infor">15</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UserPage;