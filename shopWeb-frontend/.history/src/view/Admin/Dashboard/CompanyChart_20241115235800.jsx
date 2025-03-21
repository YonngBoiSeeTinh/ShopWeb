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
const CompanyChart = ({ products = [] }) => {

  const arrCompany = arrTopic=['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Headphone', 'Accessories']

  const getCompanyData = (company) => {
    const countCompany = {};

    // Khởi tạo các 
    company.forEach((company) => {
      countCompany[company] = 0;
    });

    // Lặp qua danh sách  và tăng giá trị đếm khi tìm thấy company phù hợp
    products.forEach((product) => {
      if (countCompany[product.company] !== undefined) {
        countCompany[product.company] += 1;
      }
    });

    return countCompany;
  };

  const topicData = getCompanyData(arrCompany);

  // Chuyển đổi dữ liệu để sử dụng trong biểu đồ
  const chartTopicData = Object.entries(topicData).map(([topic, count]) => ({
    topic,
    count,
  }));


  return (
    <div>
     <ResponsiveContainer width={400} height={400}>
        <PieChart>
          <Pie
            data={chartTopicData}
            dataKey="count"
            nameKey="topic"
            outerRadius={120}
            label={(entry) => entry.topic}
          >
            {chartTopicData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyChart;
