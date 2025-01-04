import React, { useEffect, useState } from 'react';

import './Customer.css'

const CustomerManagement = ({listCustomer}) => {
 

  return (
    <div className='customer-item'>
            {listCustomer.map((customer) => (
              <div key={customer.id}>
                <div>{customer.id}</div>
                <div>{customer.name}</div>
                <div>{customer.email}</div>
                <div>{customer.phone}</div>
                <div>
                  <button onClick={() => handleDelete(customer.id)}>Xóa</button>
                </div>
              </div>
            ))}
          
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
