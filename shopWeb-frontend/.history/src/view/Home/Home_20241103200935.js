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
          const [priceFilter, setPriceFilter] = useState(null);
          const [promotionFilter, setPromotionFilter] = useState(null);
          const [sortOption, setSortOption] = useState(null);
          const [filterList, setFilterList] = useState([]);

          useEffect(() => {
            let filtered = listPro;
        
            if (filter) {
              filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(filter.toLowerCase())
              );
            }
        
            if (priceFilter) {
              filtered = filtered.filter(item => 
                item.price >= priceFilter.min && item.price <= priceFilter.max
              );
            }
        
            if (promotionFilter) {
              filtered = filtered.filter(item => item.promo === promotionFilter);
            }
        
            if (sortOption) {
              filtered = filtered.sort((a, b) => 
                sortOption.type === 'asc' ? a.price - b.price : b.price - a.price
              );
            }
        
            setFilterList(filtered);
          }, [filter, priceFilter, promotionFilter, sortOption, listPro]);
          // Kiểm tra trạng thái của truy vấn
          if (query.isLoading) {
            return <div>Loading...</div>; // Hiển thị trạng thái loading
          }
        
          if (query.isError) {
            return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
          }
        
       
          const filteredListProducts = [
            { promo: "giamgia", color: ["#fc4a1a", "#f7b733"] },
            { promo: "moi", color: ["#667db6", "#0082c8"] },
            { promo: "tragop", color: ["#74ebd5", "#ACB6E5"] },
          ];

        //filler
        const priceRanges = [
            { min: 0, max: 7000000 },
            { min: 7000000, max: 15000000 },
            { min: 15000000, max: 50000000 }
        ];

        const promotions = ['Giảm giá sâu', 'Trả góp 0%', 'Mới ra mắt'];

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
                    <FilterDropdown title="Giá tiền" options={priceRanges}  onSelect={setPriceFilter}/>
                    <FilterDropdown title="Khuyến mãi" options={promotions} onSelect={setPromotionFilter}/>
                    <FilterDropdown title="Sắp xếp" options={sortOptions} onSelect={setSortOption}/>
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
