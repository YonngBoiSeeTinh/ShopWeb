import React from 'react';
import './dashboard.scss';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
const CompanyChart = ({ products = [] ,OrderList=[]}) => {
  
  const arrCompany =['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Headphone', 'Accessories']

  const getCompanyData = (company) => {
    const countCompany = {};

    // Khởi tạo các 
    company.forEach((company) => {
      countCompany[company] = 0;
    });
// Lặp qua danh sách  và tăng giá trị đếm khi tìm thấy company phù hợp
    OrderList.forEach((order) =>{
      products.forEach((product) => {
        if(product._id === order.productId){
          if (countCompany[product.company] !== undefined) {
            countCompany[product.company] += 1;
          }
        }
      });
    })
    
   

    return countCompany;
  };
  const companyData = getCompanyData(arrCompany);
  const chartcompanyData = Object.entries(companyData).map(([company, count]) => ({
    company,
    count,
  })).filter((item) => item.count > 0);


  return (
    <div>
     <ResponsiveContainer width={310} height={400}>
        <PieChart>
          <Pie
            data={chartcompanyData}
            dataKey="count"
            nameKey="company"
            outerRadius={100}
            label={(entry) => entry.company}
          >
            {chartcompanyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyChart;
