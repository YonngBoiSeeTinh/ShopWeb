import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './TimeKeeping.scss'
const TimeKeeping = () => {
  
    return (

    <div className="storage_container">
      
      <Pagination />
    </div> 
     );
}

export default TimeKeeping;
