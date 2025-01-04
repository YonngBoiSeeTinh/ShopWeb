import React, { useEffect, useState } from 'react';

import './Customer.css'

const CustomerManagement = ({filteredCustomers}) => {
 

  return (
    <div>
     
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>

                  <button onClick={() => handleDelete(customer.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default CustomerManagement;
