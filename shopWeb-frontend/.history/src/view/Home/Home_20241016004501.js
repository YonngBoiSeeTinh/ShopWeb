import React, { useState, useEffect } from "react";
import './home.css';
import FilterDropdown from "./FilterDropdown";
import ChosenFilters from "./ChosenFilters";
import Banner from "./banner";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductList from "../Product/ProductList";
import ProductListSearch from "../Product/ProductListSearch";

function Home ({filter}){

        const fetchApi = async () => {
            try {
              const res = await axios.get(`http://localhost:3001/api/product/get`);
              return res.data.data; // Đảm bảo đây là một mảng
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          };
          
        
          const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
          const listPro = query.data || []; // Lấy danh sách sản phẩm từ query
          const [filterList, setFilterList] = useState([]); 
          useEffect(()=>{
            if (filter) {
                setFilterList(listPro.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase())));
              } 
              console.log('filterList', filterList);
          },[filter,filterList])
                
          // Kiểm tra trạng thái của truy vấn
          if (query.isLoading) {
            return <div>Loading...</div>; // Hiển thị trạng thái loading
          }
        
          if (query.isError) {
            return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
          }
        
       
          const filteredListProducts = [
            { promo: "giamgia", color: ["#fc4a1a", "#f7b733"] },
            { promo: "moi", color: ["#302b63", "#24243e"] },
            { promo: "tragop", color: ["#74ebd5", "#ACB6E5"] },
          ];

        //filler
        const priceRanges = [
            { min: 0, max: 10000000 },
            { min: 1000000, max: 5000000 },
            { min: 5000000, max: 10000000 }
        ];

        const promotions = ['Giảm giá 10%', 'Giảm giá 20%', 'Miễn phí vận chuyển'];

        const stars = [5, 4, 3];

        const sortOptions = [
            { type: 'asc', nameFilter: 'price', text: 'Giá tăng dần' },
            { type: 'desc', nameFilter: 'price', text: 'Giá giảm dần' }
        ];

        return (
            <section>
            <div className="home-container">
                
                <Banner/>

                <img src="img/banners/blackFriday.gif" alt="" style={{ width: '100%' , marginTop:'10px'}} />
                <div className="flexContain">
                    <FilterDropdown title="Giá tiền" priceRanges={priceRanges} />
                    <FilterDropdown title="Khuyến mãi" promotions={promotions} />
                    <FilterDropdown title="Số lượng sao" stars={stars} />
                    <FilterDropdown title="Sắp xếp" sortOptions={sortOptions} />
                </div>
                <ChosenFilters />

                {/* Div hiển thị khung sản phẩm hot, khuyến mãi, mới ra mắt ... */}
                <div className="contain-khungSanPham" style={{ display: filter ? 'none' : 'block' }}>
                    {filteredListProducts.map((filter, index) => (
                        <ProductList 
                            color={filter.color} 
                            listPro={listPro} 
                            filterPromo={filter.promo} 
                            key={index} 
                        />
                    ))}
                </div>

                <div className="contain-khungSanPham" style={{ display: filter ? 'block' : 'none' }}>
                   <ProductListSearch filter ={filter}  listPro ={filterList} />   
                </div>

        
            </div>
            </section>
          
        );

      
    
}

export default Home;
