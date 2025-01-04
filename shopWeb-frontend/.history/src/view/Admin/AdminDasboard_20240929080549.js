import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

const AdminDashboard = () => {
  useEffect(() => {
    
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: '# of Sales',
          data: [12, 19, 3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
      }
    });
    // Add các biểu đồ khác tương tự...
  }, []);

  return (
    <div className="dashboard">
      <div className="canvasContainer">
        <canvas id="myChart1"></canvas>
        dashboard
      </div>
      {/* Các biểu đồ khác */}
    </div>
  );
};

export default AdminDashboard;
