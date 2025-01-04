import React, { useState } from "react";
import './home.css';
import FilterDropdown from "./FilterDropdown";
import ChosenFilters from "./ChosenFilters";
import HomeProductList from "./HomeProduct-list"; 
import Banner from "./banner";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Home (){

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
         
          
          // Kiểm tra trạng thái của truy vấn
          if (query.isLoading) {
            return <div>Loading...</div>; // Hiển thị trạng thái loading
          }
        
          if (query.isError) {
            return <div>Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
          }
        
       
        const filteredProducts = [];
        const filterGiamGia = () => {
            if (Array.isArray(listPro)) {
                return listPro.filter(product => product.promo?.name === "giamgia");
            }
            return [];
        };

        // Hàm lọc theo lượt đánh giá cao (sản phẩm có số sao >= 4)
        const filterDanhGia = () => {
            if (Array.isArray(listPro)) {
                return listPro.filter(product => product.rateCount >= 20);
            }
            return [];
        };

        // Hàm lọc theo sản phẩm mới ra mắt
        const filterMoiRaMat = () => {
            if (Array.isArray(listPro)) {
                return listPro.filter(product => product.promo?.name === "moi");
            }
            return [];
        };

        // Hàm lọc theo khuyến mãi trả góp
        const filterTraGop = () => {
            if (Array.isArray(listPro)) {
                return listPro.filter(product => product.promo?.name === "tragop");
            }
            return [];
        };
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
                <div className="contain-khungSanPham">
                    <HomeProductList tenKhung="NỔI BẬT NHẤT" color={['#42bcf4', '#004c70']}  len={4} listPro ={listPro} />
                    <HomeProductList tenKhung="GIẢM GIÁ LỚN" color={['#ff9c00', '#ec1f1f']}  len={4} listPro ={filterGiamGia()}  />  
                    <HomeProductList tenKhung="SẢN PHẨM MỚI" color={['#42bcf4', '#004c70']}  len={4} listPro ={filterMoiRaMat()} />
                    <HomeProductList tenKhung="TRẢ GÓP 0%" color={['#141e30', '#2c3e50']} len={4} listPro ={filterTraGop()} />      
                </div>
            </div>
            </section>
          
        );

      
    
}

export default Home;
