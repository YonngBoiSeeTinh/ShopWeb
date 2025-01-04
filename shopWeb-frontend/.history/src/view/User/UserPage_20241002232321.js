import React, { useState } from "react"; // Nhập useState
import './userPage.css';
import { logout } from "../../Service/UserService";
import { resetUser } from "../../Redux/sliders/userSlide";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function UserPage ({ setIsSignIn }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleLogOut = async () => {
        await logout();
        dispatch(resetUser());
        setIsSignIn(false);
        navigate('/');
    };

    const user = useSelector((state) => state.user);

    // Hàm để kích hoạt chế độ chỉnh sửa
    const handleEditPhone = () => {
        setIsEditingPhone(true);
        setPhone(user.phone); // Đặt giá trị ban đầu cho input
    };

    const handleEditAddress = () => {
        setIsEditingAddress(true);
        setAddress(user.address); // Đặt giá trị ban đầu cho input
    };

    const handleSavePhone = () => {
        // Gửi yêu cầu cập nhật số điện thoại
        // await updatePhone(phone); // Bạn có thể tạo hàm này để cập nhật số điện thoại
        setIsEditingPhone(false);
    };

    const handleSaveAddress = () => {
        // Gửi yêu cầu cập nhật địa chỉ
        // await updateAddress(address); // Bạn có thể tạo hàm này để cập nhật địa chỉ
        setIsEditingAddress(false);
    };

    return (
        <div style={{ margin: '40px' }}>
            <div className="user-page">
                <div className="user-profile">
                    <div className="avatar-section">
                        <img src="https://via.placeholder.com/150" alt="User Avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{display:'flex'}}>
                            <h1 className="user-name">{user.name}</h1> 
                            <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser"/> 
                        </div>
                        <div style={{display:'flex'}}>
                            <p className="user-email">{user.email}</p>
                            <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser"/> 
                        </div>
                        <div className="user-action">
                            <button className="edit-profile-btn">Chỉnh sửa tài khoản</button>
                            <button className="logout-btn" onClick={() => handleLogOut()}>
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                    <div className="account-table">
                        <div className="account-table_row">
                            <div className="table_row-header">Ngày tạo tài khoản:</div>
                            <div className="table_row-infor">01/01/2023</div>
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            {isEditingPhone ? (
                                <>
                                    <input 
                                        className="table_row-infor" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)} 
                                    />
                                    <button onClick={handleSavePhone}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <span className="table_row-infor">{user.phone}</span>
                                    <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        className="iconEditUser" 
                                        onClick={handleEditPhone} 
                                    /> 
                                </>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            {isEditingAddress ? (
                                <>
                                    <input 
                                        className="table_row-infor" 
                                        value={address} 
                                        onChange={(e) => setAddress(e.target.value)} 
                                    />
                                    <button onClick={handleSaveAddress}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <span className="table_row-infor">{user.address}</span>
                                    <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        className="iconEditUser" 
                                        onClick={handleEditAddress} 
                                    />
                                </>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số đơn hàng đã thực hiện:</div>
                            <div className="table_row-infor">15</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
