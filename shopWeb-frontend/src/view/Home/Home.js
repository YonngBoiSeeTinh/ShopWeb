import React, { useState, useEffect } from "react";
import './home.scss';
import FilterDropdown from "./FilterDropdown";
import ChosenFilters from "./ChosenFilters";
import Banner from "./banner";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductList from "../Product/ProductList";
import FLashSale from "../Product/FlashSaleList"
import ProductListSearch from "../Product/ProductListSearch";
import Loading from "../Loading/Loading"
import { useNavigate } from "react-router-dom";
import CategoryItem from "./CategoryItem";
function Home ({filter}){
  const navigate = useNavigate(); 
  // filter đc truyền từ component cha
        // Lấy dữ liệu
        const fetchApi = async () => {
            try {
              // gọi api ở backennd
              const res = await axios.get(`http://localhost:3001/api/product/get`);
              return res.data.data; //TRả về dữ liệu  
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          };
          
          // gọi hàm lấy dữ liệu
          const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
          const listPro = query.data || []; // Lấy danh sách sản phẩm từ query thành 1 mảng
          const [priceFilter, setPriceFilter] = useState(null);
          const [promotionFilter, setPromotionFilter] = useState(null);
          const [sortOption, setSortOption] = useState(null);
          const [filterList, setFilterList] = useState([]);

          const fetchApiCate = async () => {
            try {
              // gọi api ở backennd
              const res = await axios.get(`http://localhost:3001/api/category/get`);
              return res.data.data; //TRả về dữ liệu  
            } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
            }
          };
          
          // gọi hàm lấy dữ liệu
          const queryCate = useQuery({ queryKey: ['categories'], queryFn: fetchApiCate });
          const listCate = queryCate.data || []; // Lấy danh sách sản phẩm từ query thành 1 mảng

          useEffect(() => {
            let filtered = listPro; // mảng tìm kiếm
        
            if (filter) {
              filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(filter.toLowerCase())
              );
            }
        
            // if (priceFilter) {
            //   filtered = filtered.filter(item => 
            //     item.price >= priceFilter.min && item.price <= priceFilter.max
            //   );
            // }
        
            // if (promotionFilter) {
            //   filtered = filtered.filter(item => item.promo === promotionFilter);
            // }
        
            // if (sortOption) {
            //   filtered = filtered.sort((a, b) => 
            //     sortOption.type === 'asc' ? a.price - b.price : b.price - a.price
            //   );
            // }
        
            setFilterList(filtered);
          }, [filter]); // chạy khi mà filter
         // [filter, priceFilter, promotionFilter, sortOption, listPro]);
          // Kiểm tra trạng thái của truy vấn
          if (query.isLoading) {
            return <Loading/>; // Hiển thị trạng thái loading
          }
        
          if (query.isError) {
            return <div className="error_page">Error fetching data: {query.error.message}</div>; // Hiển thị lỗi nếu có
          }
        
        //filler
        const priceRanges = [
            { min: 0, max: 7000000 },
            { min: 7000000, max: 15000000 },
            { min: 15000000, max: 50000000 }
        ];
        
        const promotions =[]

        const sortOptions = [
            { type: 'asc', nameFilter: 'price', text: 'Giá tăng dần' },
            { type: 'desc', nameFilter: 'price', text: 'Giá giảm dần' }
        ];
        
        const handleClickCate = (cate) => {
          navigate(`/category/${cate._id}`, { state: { name: cate.name } }); // Truyền state đúng cú pháp
        };

        return (
          <div className="home-container">     
              <Banner/>
              <section>
                  <div className="flexContain" style={{marginTop:"20px"}}>
                      <FilterDropdown title="Giá tiền" options={priceRanges}  onSelect={setPriceFilter}/>
                      <FilterDropdown title="Khuyến mãi" options={promotions} onSelect={setPromotionFilter}/>
                      <FilterDropdown title="Sắp xếp" options={sortOptions} onSelect={setSortOption}/>
                  </div>
                  <ChosenFilters />

                  {/* Div hiển thị khung sản phẩm ban chay, khuyến mãi, mới ra mắt ... */}
                  <div className=" list_flash-sale" style={{ display: filter ? 'none' : 'block' }}>
                          <FLashSale 
                            listPro={listPro} 
                          />
                  </div>
                  <div className="category_lists">
                    {listCate.map((cate, index)=>(
                       <CategoryItem cate = {cate} index = {index} handleClickCate={()=>handleClickCate(cate)} />
                    ))}
                  </div>
                  <div className=" list_best-selling" style={{ display: filter ? 'none' : 'block' }}>
                          <ProductList 
                            listPro={listPro} 
                          />
                  </div>
                  <div className=" list_new" style={{ display: filter ? 'none' : 'block' }}>
                          <ProductList 
                            listPro={listPro} 
                          />
                  </div>
                  <div className="" style={{ display: filter ? 'block' : 'none' }}>
                    <ProductListSearch filter ={filter}  listPro ={filterList} />   
                  </div>
               </section>
          </div>
           
          
        );

      
    
}

export default Home;
