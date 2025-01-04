import React, { useState, useContext } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination';
import './TimeKeeping.scss';
import { FilterContext } from '../AdminLayout';

const TimeKeeping = () => {
  const { filter } = useContext(FilterContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeKeepingRecords, setTimeKeepingRecords] = useState([]); // State to hold timekeeping records

  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/user/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ['products', currentPage],
    queryFn: fetchApi,
  });

  const querydata = query.data || [];
  const listCustomer = querydata.filter((item) => item.role === "employee");
  const itemsPerPage = 7;
  const totalPage = Math.ceil(listCustomer.length / itemsPerPage);

  const listFilter = filter
    ? listCustomer.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
    : listCustomer;

  const startIndex = currentPage * itemsPerPage;
  const currentCus = listFilter.slice(startIndex, startIndex + itemsPerPage);

  const handleDateChange = (event) => setSelectedDate(event.target.value);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleCheckIn = async (userId, name, status) => {
    try {
      const response = await axios.post('http://localhost:3001/api/timekeeping/create', {
        userId,
        name,
        status,
        date: selectedDate,
      });

      // Update local state to reflect new status
      setTimeKeepingRecords(prevRecords => {
        const updatedRecords = [...prevRecords];
        const index = updatedRecords.findIndex(record => record.userId === userId);
        if (index > -1) {
          updatedRecords[index].status = status; // Update existing record
        } else {
          updatedRecords.push({ userId, status, date: selectedDate }); // Add new record
        }
        return updatedRecords;
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error in creating timekeeping record:', error);
    }
  };

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
    onSuccess: (data) => {
      const filteredRecords = data.filter((item) => {
        const itemDate = new Date(item.date).toISOString().split('T')[0]; // Convert item.date to "YYYY-MM-DD"
        return itemDate === selectedDate;
      });
      setTimeKeepingRecords(filteredRecords); // Set initial state for timekeeping records
    },
  });

  return (
    <div className="timekeeping_container">
      <h3>Chấm công</h3>
      <div className="timekeeping_title">
        <div className="num">#</div>
        <div className="name">Tên</div>
        <div className="date">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="status">Có mặt</div>
        <div className="status">Vắng</div>
        <div className="status">Phép</div>
        <div className="status">Trễ</div>
      </div>
      <div className="timekeeping_list">
        {currentCus.map((item, index) => {
          const timeKeepingRecord = timeKeepingRecords.find(
            (record) => record.userId === item._id
          );
          return (
            <div className="timekeeping_title timekeeping_item" key={item._id}>
              <div className="num">{index + 1}</div>
              <div className="name">
                <img src={item.avatar || 'default_avatar_url.jpg'} alt={`${item.name}'s avatar`} />
                {item.name}
              </div>
              <div className="date">{formatDate(selectedDate)}</div>
              <div className="status">
                <input
                  type="radio"
                  name={`status-${item._id}`}
                  onChange={() => handleCheckIn(item._id, item.name, 'Có mặt')}
                  checked={timeKeepingRecord?.status === 'Có mặt'}
                />
              </div>
              <div className="status">
                <input
                  type="radio"
                  name={`status-${item._id}`}
                  onChange={() => handleCheckIn(item._id, item.name, 'Vắng')}
                  checked={timeKeepingRecord?.status === 'Vắng'}
                />
              </div>
              <div className="status">
                <input
                  type="radio"
                  name={`status-${item._id}`}
                  onChange={() => handleCheckIn(item._id, item.name, 'Phép')}
                  checked={timeKeepingRecord?.status === 'Phép'}
                />
              </div>
              <div className="status">
                <input
                  type="radio"
                  name={`status-${item._id}`}
                  onChange={() => handleCheckIn(item._id, item.name, 'Trễ')}
                  checked={timeKeepingRecord?.status === 'Trễ'}
                />
              </div>
            </div>
          )
        })}
      </div>
      <Pagination totalPage={totalPage * 10} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default TimeKeeping;
