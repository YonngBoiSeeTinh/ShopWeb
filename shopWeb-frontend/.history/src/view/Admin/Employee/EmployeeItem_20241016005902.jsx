import React, { useEffect, useState } from 'react';

import './Employee.scss'

const EmployeeItem = ({customer}) => {
 

  return (
    <div className='customer-item'>            
             
                <div>{customer.name}</div>
                <div>{customer.email}</div>
                <div>{customer.phone}</div>
              
                  <button onClick={() => handleDelete(customer.id)}>Xóa</button>
                     
    </div>
  );
};



const handleDelete = (id) => {
  console.log('Xóa khách hàng có ID:', id);
};

export default EmployeeItem;
