import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Order from '../Order/Order'
import { useLocation } from "react-router-dom";

function UserPage({ setAlertMessage,setShowAlert, setType }) {
    const location = useLocation()
    const user = location.state?.user;
    console.log('employee', user);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [avatar, setAvatar] = useState("");
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);

    const handleEditPhone = () => setIsEditingPhone(true);
    const handleEditAddress = () => setIsEditingAddress(true);
    const handleEditName = () => setIsEditingName(true);
    const handleEditEmail = () => setIsEditingEmail(true);

    const handleSavePhone = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { phone });
           
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật số điện thoại thành công ");
                setType("success");
                setShowAlert(true);
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
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { address });
            console.log(user._id);
            console.log(response);
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật  địa chỉ thành công");
                setType("success");
                setShowAlert(true);
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
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { name });
            if (response.data.status === 'OK') {
                setAlertMessage("Cập nhật tên thành công");
                setType("success");
                setShowAlert(true);
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
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { email });
            if (response.data.status === 'OK') {
                setAlertMessage("Cập email  thành công");
                setType("success");
                setShowAlert(true);
            } else {
                alert(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
        setAlertMessage(error.response.data.message);
            setType("danger");
            setShowAlert(true);
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
            const response = await axios.put(`http://localhost:3001/api/user/update/${user._id}`, { avatar });
            console.log('avatar', avatar);
           
            if (response.data.status === 'OK') {
                console.log(response); // Cập nhật Redux
                setAlertMessage("Cập nhật avatar thành công");
                setType("success");
                setShowAlert(true);
            } else {
                
            }
        } catch (error) {
            alert(error.response.data.statusText);
            console.error('Error updating avatar:', error);
        }
    };
    const fetchApiTimeKeeping = async () => {
        console.log(user._id);
        try {
          const res = await axios.get(`http://localhost:3001/api/timekeeping/getByUserId/${user?._id}`);   
          return res.data.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
    
      const queryTimeKeeping = useQuery({
        queryKey: ['TimeKeeping'],
        queryFn: fetchApiTimeKeeping,
      });
      console.log('queryTimeKeeping',queryTimeKeeping.data);
      const listTimeKeeping = queryTimeKeeping.data
    return (
        <div style={{height:"100vh", marginTop:"130px " }}>
            <div className="user-page">
                <div className="user-profile">
                    <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                    <div className="avatar-section" onClick={() => document.getElementById('fileInput').click()}>
                        <img src={user?.avatar ? user.avatar : (avatar?avatar:"https://cdn-icons-png.flaticon.com/512/4211/4211763.png")} alt="avatar" className="user-avatar" />
                    </div>
                    <div className="user-info">
                        <div style={{ display: 'flex' }}>
                            {isEditingName ? (
                                <>
                                    <input className="table_row-infor" value={name} onChange={(e) => setName(e.target.value)} />
                                    <button  className="submit_upt_suer" onClick={handleSaveName}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <h1 className="user-name">{name || ""}</h1>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditName} />
                                </>
                            )}
                        </div>
                        <div style={{ display: 'flex' }}>
                            {isEditingEmail ? (
                                <>
                                    <input className="table_row-infor" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button  className="submit_upt_suer" onClick={handleSaveEmail}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <p className="user-email">{email || ""}</p>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditEmail} />
                                </>
                            )}
                        </div>
                        <div className="user-action">
                            <button className="edit-profile-btn">Đổi mật khẩu</button>
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
                            })}</div>
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            {isEditingPhone ? (
                                <>
                                    <input className="table_row-infor" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <button className="submit_upt_suer" onClick={handleSavePhone}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <div className="table_row-infor">{phone || ""}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditPhone} />
                                </>
                            )}
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            {isEditingAddress ? (
                                <>
                                    <input className="table_row-infor" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    <button  className="submit_upt_suer" onClick={handleSaveAddress}>Lưu</button>
                                </>
                            ) : (
                                <>
                                    <div className="table_row-infor">{address || ""}</div>
                                    <FontAwesomeIcon icon={faPenToSquare} className="iconEditUser" onClick={handleEditAddress} />
                                </>
                            )}
                        </div> 
                    </div>
                </div>
                <div className="timekeeping_container" style={{width:"80%"}}>
                    <div className="employee_timekeeping-select">
                        <h4>Chấm công </h4>
                        <input
                        type="date"/>
                    </div>
                    <div className="timekeeping_title">
                        <div className="date">
                        </div>
                        <div className="status">Có mặt</div>
                        <div className="status">Vắng</div>
                        <div className="status">Phép</div>
                        <div className="status">Trễ</div>
                    </div>
                    <div className="employee_timekeeping-list">
                    {listTimeKeeping.map((item, index) => {
                        return(
                        <div className="timekeeping_title timekeeping_item" key={index}>
                            <div className="date">{(item.date)}</div>
                            <div className="status">
                                <input
                                type="radio"
                                name={`status-${item._id}`}
                                checked={item?.status === 'Có mặt'}
                                />
                            </div>
                            <div className="status">
                                <input
                                type="radio"
                                name={`status-${item._id}`}
                                checked={item?.status === 'Vắng'}
                                />
                            </div>
                            <div className="status">
                                <input
                                type="radio"
                                name={`status-${item._id}`}
                                checked={item?.status === 'Phép'}
                                />
                            </div>
                            <div className="status">
                                <input
                                type="radio"
                                name={`status-${item._id}`}
                                checked={item?.status === 'Trễ'}
                                />
                            </div>
                            </div>
                        )
                        }
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
