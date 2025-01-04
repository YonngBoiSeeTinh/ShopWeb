import React from 'react';
import { Link } from 'react-router-dom';
import './Employee.scss';

const CustomerManagement = ({ employee,key }) => {

  const handleDelete = (id) => {
    console.log('Xóa khách hàng có ID:', id);
    // Thực hiện các thao tác xóa như gọi API hoặc cập nhật state ở đây
  };

  return (
    <div className="customer_title customer_item">
      <div className="num">{key}</div>
      <div className="name">
        <img src={employee.avatar} alt={`${employee.name}'s avatar`} />
        {employee.name}
      </div>
      <div className="email">{employee.email}</div>
      <div className="phone">{employee.phone}</div>
      <div className="address">{employee.address}</div>
      <div className="action">
        <Link to={'/employeeDetail'} state={{ user: employee }}>Xem Chi tiết</Link>
        <button onClick={() => handleDelete(employee.id)}>X</button>
      </div>
    </div>
  );
};

export default CustomerManagement;
