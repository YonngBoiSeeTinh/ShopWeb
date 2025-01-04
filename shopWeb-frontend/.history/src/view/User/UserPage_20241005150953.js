import React, { useState,useEffect,useQuery } from "react";
import './userPage.css';
import { logout } from "../../Service/UserService";
import { resetUser, updateUser } from "../../Redux/sliders/userSlide"; // Đảm bảo import đúng hàm updateUser
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Order from '../Order/Order'

function UserPage({ setIsSignIn }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');


    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleLogOut = async () => {
        await logout();
        dispatch(resetUser());
        setIsSignIn(false);
        navigate('/');
    };

    const user = useSelector((state) => state.user);

    const handleEditPhone = () => setIsEditingPhone(true);
    const handleEditAddress = () => setIsEditingAddress(true);
    const handleEditName = () => setIsEditingName(true);
    const handleEditEmail = () => setIsEditingEmail(true);

    const handleSavePhone = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, { phone });
           
            if (response.data.status === 'OK') {
                dispatch(updateUser({ ...user, phone })); // Cập nhật Redux
                alert('Cập nhật số điện thoại thành công!');
            } else {
                console.log(response.data); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingPhone(false);
    };
    const handleSaveAddress = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, { address });
            console.log(user.id);
            console.log(response);
            if (response.data.status === 'OK') {
                
                dispatch(updateUser({ ...user, address })); // Cập nhật Redux
                alert('Cập nhật  địa chỉ thành công!');
            } else {
               
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingAddress(false);
    };

    const handleSaveName = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, { name });
            if (response.data.status === 'OK') {
                dispatch(updateUser({ ...user, name })); // Cập nhật Redux
                alert('Cập nhật tên thành công!');
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert(error.response.data.message); 
        }
        setIsEditingName(false);
    };

    const handleSaveEmail = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, { email });
            if (response.data.status === 'OK') {
                dispatch(updateUser({ ...user, email })); // Cập nhật Redux
                alert('Cập nhật email thành công!');
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
           
            alert(error.response.data.message); 
        }
        setIsEditingEmail(false);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setAvatar(imageUrl); // Cập nhật avatar xong mới gọi handleSaveAvatar
            };
            reader.readAsDataURL(file);
        }
    };
    // Sử dụng useEffect để gọi handleSaveAvatar khi avatar thay đổi
    useEffect(() => {
        if (avatar) {
            handleSaveAvatar();
        }
    }, [avatar]);
    const handleSaveAvatar = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, { avatar });
            console.log('avatar', avatar);
           
            if (response.data.status === 'OK') {
                dispatch(updateUser({ ...user, avatar }));
                console.log(response); // Cập nhật Redux
                alert('Cập nhật avatar thành công!');
            } else {
                
            }
        } catch (error) {
            alert(error.response.data.statusText);
            console.error('Error updating avatar:', error);
        }
    };
    const fetchApi = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/order/getByUserId/${user.id}`);
          return res.data.data;  
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
      const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
      const lisrOrder = query.data || []; 
    return (
        <div style={{ margin: '40px' }}>
            <div className="user-page">
                <div className="user-profile">
                  
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="avatar-section" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={avatar ? avatar : "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                            {isEditingName ? (
                                <>
                                    <input className="table_row-infor" value={name} onChange={(e) => setName(e.target.value)} />
                                    <button onClick={handleSaveName}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <h1 className="user-name">{user.name}</h1>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditName} />
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {isEditingEmail ? (
                                <>
                                    <input className="table_row-infor" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button onClick={handleSaveEmail}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <p className="user-email">{user.email}</p>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditEmail} />
                                </>
                            )}
                        </div>
                        <div className="user-action">
                            <button className="edit-profile-btn">Đổi mật khẩu</button>
                            <button className="logout-btn" onClick={handleLogOut}>
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
                                    <input className="table_row-infor" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <button onClick={handleSavePhone}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <div className="table_row-infor">{user.phone}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditPhone} />
                                </>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            {isEditingAddress ? (
                                <>
                                    <input className="table_row-infor" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <button onClick={handleSaveAddress}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <div className="table_row-infor">{user.address}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditAddress} />
                                </>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số đơn hàng đã thực hiện:</div>
                            <div className="table_row-infor">15</div>
                        </div>
                        <div className="Order-list">
                            <h3>Đơn hàng của bạn:</h3>
                                <Order/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
