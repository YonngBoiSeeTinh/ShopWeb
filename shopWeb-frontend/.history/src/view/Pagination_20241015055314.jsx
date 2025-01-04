import React from 'react';
import { Pagination } from 'antd';
const App = ({totalPage}) => 
    <Pagination defaultCurrent={1} total={totalPage} className='pagination'/>;
export default App;