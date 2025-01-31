import React from "react";
import { Link } from "react-router-dom";
import './TopNav.css'
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';

const Navigation =()=> {

        const fetchApiCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/category/get`);
                console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
                return res.data.data; // Đảm bảo đây là một mảng
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
      
        const queryCategory = useQuery({ queryKey: ['categories'], queryFn: fetchApiCategory });
        const listCategory = queryCategory.data || [];

        return (
        <div className="top-nav group">
            <section>
                <ul className="top-nav-quicklink flexContain">
                    {listCategory.map((cate, index)=>(
                        <li ><Link to={`/category/${cate._id}`} index = {index} state={{ name: cate.name }}  > {cate.name}</Link></li>
                    ))}
                    <li><Link to="/new"> Hot News</Link></li>
                    <li><Link to="/takecare"> TopCare  </Link></li>
                </ul> 
            </section>
        </div>
        );
    }

export default Navigation;
