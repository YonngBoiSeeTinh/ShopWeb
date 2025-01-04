import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './TimeKeeping.scss'
const TimeKeeping = () => {
  
    return (

    <div className="timekeeping_container">
      <div className="timekeeping_title">
        <div>#</div>
      </div>
      <div className="timekeeping_list"></div>
      <Pagination />
    </div> 
     );
}

export default TimeKeeping;
