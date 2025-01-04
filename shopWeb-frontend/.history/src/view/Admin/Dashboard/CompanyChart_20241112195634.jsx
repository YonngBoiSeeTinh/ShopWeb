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
const TopicChart = ({ playlists = [] }) => {
  // Hàm gọi API để lấy danh sách chủ đề
  const fetchApi = async () => {
      try {
          const res = await axios.get(`http://localhost:3001/api/topic/get`); 
          return res.data.data; 
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }
  };

  const query = useQuery({ queryKey: ['topics'], queryFn: fetchApi });
  const arrTopic = query.data || [];
  const arrTopicName = arrTopic.map(topic => topic.value);

  // Hàm để đếm số lượng playlist cho từng chủ đề
  const getTopicData = (topics) => {
    const countByTopic = {};

    // Khởi tạo các chủ đề với giá trị đếm ban đầu là 0
    topics.forEach((topic) => {
      countByTopic[topic] = 0;
    });

    // Lặp qua danh sách playlist và tăng giá trị đếm khi tìm thấy topic phù hợp
    playlists.forEach((playlist) => {
      if (countByTopic[playlist.topic] !== undefined) {
        countByTopic[playlist.topic] += 1;
      }
    });

    return countByTopic;
  };

  const topicData = getTopicData(arrTopicName);

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

export default TopicChart;
