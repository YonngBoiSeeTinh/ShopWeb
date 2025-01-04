import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './TimeKeeping.scss'
const TimeKeeping = () => {
  
    return (

    <div className="storage_container">
      <div className="storage_title">
        <div>#</div>
      </div>
      <div className="storage_list"></div>
      <Pagination />
    </div> 
     );
}

export default TimeKeeping;
