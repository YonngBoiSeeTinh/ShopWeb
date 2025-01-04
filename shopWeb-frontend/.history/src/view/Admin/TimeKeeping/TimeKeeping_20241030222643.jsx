import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './TimeKeeping.scss'
const TimeKeeping = () => {
  
    return (

    <div className="timekeeping_container">
        <h3>Chấm công</h3>
        <div className="timekeeping_title">
          <div className="num">#</div>
          <div className="Name">Tên</div>
          <div className="date">Ngày</div>
          <div className="date">Có mặt</div>
          <div className="date">Vắng</div>
          <div className="date">Trễ</div>
        </div>
      <div className="timekeeping_list">
        <div className="timekeeping_item">
          <div className="num">#</div>
          <div className="Name">Tên</div>
          <div className="date">Ngày</div>
          <div className="date">Có mặt</div>
          <div className="date">Vắng</div>
          <div className="date">Trễ</div>
        </div>
      </div>
      <Pagination />
    </div> 
     );
}

export default TimeKeeping;
