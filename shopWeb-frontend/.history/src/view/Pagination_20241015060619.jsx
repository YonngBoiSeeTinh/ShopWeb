import React, { useState } from 'react';
import { Pagination } from 'antd';

const App = ({ totalPage, currentPage,setCurrentPage }) => {
    console.log(currentPage);
    // Hàm xử lý khi người dùng thay đổi trang
    const handleChange = (page) => {
        setCurrentPage(page-1); // Cập nhật trang hiện tại
        console.log(currentPage);
    };

    return (
        <Pagination
            current={currentPage} 
            total={totalPage}     
            onChange={handleChange}  
            className='pagination'
        />
    );
};

export default App;
