import React, { useState, useEffect } from "react";
import './userPage.scss';
import { logout,GetDetailUser } from "../../Service/UserService";
import { resetUser, updateUser as updateReduxUser } from "../../Redux/sliders/userSlide";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AddressForm from "./Address";
import Order from '../Order/Order';

function UserPage({ setIsSignIn, setAlertMessage, setShowAlert, setType }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
      
    }, []);
    const [updateUser, setUpdateUser] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        avatar: user?.avatar || ""
    });
    const [isEditing, setIsEditing] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setUpdateUser((prev) => ({
                    ...prev,
                    avatar: imageUrl
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user.id}`, updateUser);
            if (response.data.status === 'OK') {
                dispatch(updateReduxUser({ ...user, ...updateUser }));
                setAlertMessage("Cập nhật thông tin người dùng thành công!");
                setType("success");
                setShowAlert(true);
                setIsEditing(false);
            } 
        } catch (error) {
            setAlertMessage(error.response.data.message);
            setType("warning");
            setShowAlert(true);
        }
    };

    const handleLogOut = async () => {
        await logout();
        dispatch(resetUser());
        setIsSignIn(false);
        navigate('/');
    };

    // Fetch user's orders
    const fetchApi = async () => {
        const res = await axios.get(`http://localhost:3001/api/order/getByUserId/${user?.id}`);
        return res.data.data;
    };
    const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });
    const { refetch } = query;
    const queryData = query.data || [];

    const handleDeleteOrder = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/order/delete/${id}`);
            if (res.status === 200) {
                setAlertMessage("Đơn hàng đã được xóa thành công!");
                setType("success");
                setShowAlert(true);
                refetch();
            }
        } catch (error) {
            setAlertMessage("Có lỗi xảy ra khi xóa đơn hàng.");
            setType("warning");
            setShowAlert(true);
        }
    };

    return (
        <div style={{ margin: '40px' }}>
            <div className="user-page">
                <div className="user-profile">
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div
                        className="avatar-section"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <img
                            src={updateUser.avatar || "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"}
                            alt="avatar"
                            className="user-avatar"
                        />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                            {isEditing ? (
                                
                                     <input
                                        className="head table_row-infor"
                                        name="name"
                                        value={updateUser.name}
                                        onChange={handleChange}
                                    />
                               
                               
                            ) : (
                                <h1 className="user-name">{updateUser.name}</h1>
                            )}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {isEditing ? (
                                <input
                                   className="head table_row-infor"
                                    name="email"
                                    value={updateUser.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p className="user-email">{updateUser.email}</p>
                            )}
                        </div>
                     
                        <div className="user-action">
                            {isEditing ? (
                                    <button className="edit-profile-btn" onClick={handleSubmit}>Lưu</button>
                                ) : (
                                    <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Cập nhật tài khoản</button>
                            )}
                            <button className="logout-btn" onClick={handleLogOut}>Đăng xuất</button>
                        </div>
                       
                        </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                   
                    <div className="account-table">
                        <div className="account-table_row">
                            <div className="table_row-header">Ngày tạo tài khoản:</div>
                            <div className="table_row-infor">
                                {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </div>
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            {isEditing ? (
                                <input
                                    className="table_row-infor"
                                    name="phone"
                                    value={updateUser.phone}
                                    onChange={handleChange}
                                />
                            ) : (
                                <div className="table_row-infor">{updateUser.phone}</div>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            {isEditing ? (
                                <AddressForm address={updateUser.address} setAddress={(address) => setUpdateUser((prev) => ({ ...prev, address }))} />
                            ) : (
                                <div className="table_row-infor">{updateUser.address}</div>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Mật khẩu:</div>
                            {isEditing ? (
                                <input
                                    className="table_row-infor"
                                    name="phone"
                                />
                            ) : (
                                <div className="table_row-infor">{updateUser.phone}</div>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số đơn hàng đã thực hiện:</div>
                            <div className="table_row-infor">{queryData.length}</div>
                        </div>
                        <div className="Order-list" style={{ display: user.role === "employee" ? "none" : "block" }}>
                            <h3>Đơn hàng của bạn:</h3>
                            {queryData.map((order, index) => (
                                <Order
                                    order={order}
                                    key={index}
                                    handleDeleteOrder={handleDeleteOrder}
                                    setAlertMessage={setAlertMessage}
                                    setShowAlert={setShowAlert}
                                    setType={setType}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
