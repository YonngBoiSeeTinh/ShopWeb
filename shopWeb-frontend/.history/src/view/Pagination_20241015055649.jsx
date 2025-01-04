import React, { useState } from 'react';
import { Pagination } from 'antd';

const App = ({ totalPage, hanedelPagination }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Hàm xử lý khi người dùng thay đổi trang
    const handleChange = (page) => {
        setCurrentPage(page); // Cập nhật trang hiện tại
        hanedelPagination(page); // Gọi hàm để xử lý logic phân trang
    };

    return (
        <Pagination
            current={currentPage} // Trang hiện tại
            total={totalPage}     // Tổng số trang
            onChange={handleChange}  // Hàm gọi khi thay đổi trang
            className='pagination'
        />
    );
};

export default App;
