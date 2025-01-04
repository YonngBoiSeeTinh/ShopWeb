import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import './dashboard.css'
const AdminDashboard = () => {

  return (
    <div className="dashboard">
      <div className='chart1'></div>
    </div>
  );
};

export default AdminDashboard;
