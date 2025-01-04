import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerItem from './CustomerItem'
import './Customer.css'

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers'); // API khách hàng
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  // Search logic
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='.customer-management'>
      <h1>Quản lý khách hàng</h1>
      <input
        type="text"
        placeholder="Tìm kiếm khách hàng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <CustomerItem filteredCustomers={filteredCustomers}/>
          </tbody>
        </table>
      )}
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
