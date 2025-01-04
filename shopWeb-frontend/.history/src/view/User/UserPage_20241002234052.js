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

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [name, setName] = useState('');
    const [emil, setEmail] = useState('');

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
       
    };

    const handleEditAddress = () => {
        setIsEditingAddress(true);
       
    };
    const handleEditName = async () => {
        const response = await axios.put(`/api/users/${user.id}`, { phone });
        if (response.data.status === 'OK') {
            // Cập nhật thành công
            alert('Cập nhật số điện thoại thành công!');
        } else {
            alert(response.data.message); // Hiển thị thông báo lỗi
        }
        setIsEditingName(true);
       
    };
    const handleEditEmail = () => {
        setIsEditingEmail(true);
       
    };

    const handleSavePhone = () => {      
        setIsEditingPhone(false);
    };

    const handleSaveAddress = () => {
        setIsEditingAddress(false);
    };
    const handleSaveName = () => {      
        setIsEditingName(false);
    };
    const handleSaveEmail = () => {      
        setIsEditingEmail(false);
    };

    return (
        <div style={{ margin: '40px' }}>
            <div className="user-page">
                <div className="user-profile">
                    <div className="avatar-section">
                        <img src={user.avatar?user.avatar:""} alt="Thêm ảnh" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{display:'flex'}}>
                        {isEditingName ? (
                                <>
                                    <input 
                                        className="table_row-infor" 
                                        value={name} 
                                        onChange={(e) => setPhone(e.target.value)} 
                                    />
                                    <button onClick={handleSaveName}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <h1 className="user-name">{user.name}</h1> 
                                    <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        className="iconEditUser" 
                                        onClick={handleEditName} 
                                    /> 
                                </>
                            )}
                          
                        </div>
                        <div style={{display:'flex'}}>
                        {isEditingEmail ? (
                                <>
                                    <input 
                                        className="table_row-infor" 
                                        value={name} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                    <button onClick={handleSaveEmail}>Lưu</button>
                                </>
                            ) : (
                                <>
                                     <p className="user-email">{user.email}</p>
                                    <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        className="iconEditUser" 
                                        onClick={handleEditEmail} 
                                    /> 
                                </>
                            )}
                           
                        </div>
                        <div className="user-action">
                            <button className="edit-profile-btn">Đổi mật khẩu</button>
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
                                    <div className="table_row-infor">{user.phone}</div>
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
                                    <div className="table_row-infor">{user.address}</div>
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
