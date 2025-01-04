import React from 'react';
import { Link } from 'react-router-dom';
import './Employee.scss';

const CustomerManagement = ({ employee,index }) => {

  
  const fetchApiTimeKeeping = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/timekeeping/get`);   
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
  return (
    <div className="customer_title customer_item">
      <div className="num">{index +1}</div>
      <div className="name">
        <img src={employee.avatar} alt={`${employee.name}'s avatar`} />
        {employee.name}
      </div>
      <div className="email">{employee.email}</div>
      <div className="phone">{employee.phone}</div>
      <div className="address">{employee.address}</div>
      <div className="action">
        <Link to={'/admin/employeeDetail'} state={{ user: employee }}>Xem Chi tiết</Link>
        <button onClick={() => handleDelete(employee.id)}>X</button>
      </div>
    </div>
  );
};

export default CustomerManagement;
