import React,{useState} from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Pagination from '../../Pagination'
import './Storage.scss'
const Storage = () => {
  
    return (
    <div className="storage_container">
      <h3>Tồn kho</h3>
      <div className="storage_title">
        <div className="num"> #</div>
        <div className="name"> Tên sản phẩm</div>
        <div className="version"> Màu</div>
        <div className="count"> Số lượng</div>
        <div className="action"> Hành động</div>
      </div>
      <div className="storage_list">
        
      </div>
      <Pagination />
    </div> 
     );
}

export default Storage;
