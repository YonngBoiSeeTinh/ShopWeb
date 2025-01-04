import React, { useState } from 'react';
import { Pagination } from 'antd';

const App = ({ totalPage, setCurrentPage }) => {
    
    // Hàm xử lý khi người dùng thay đổi trang
    const handleChange = (page) => {
        setCurrentPage(page); // Cập nhật trang hiện tại
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
