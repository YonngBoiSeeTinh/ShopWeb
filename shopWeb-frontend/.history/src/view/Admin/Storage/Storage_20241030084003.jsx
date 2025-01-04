import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './Storage.scss'
const Storage = () => {
  
    return (

    <div className="storage_container">
      
      <Pagination />
    </div> 
     );
}

export default Storage;
