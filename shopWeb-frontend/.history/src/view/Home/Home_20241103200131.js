import React, { useState, useEffect } from "react";
import './home.css';
import FilterDropdown from "./FilterDropdown";
import ChosenFilters from "./ChosenFilters";
import Banner from "./banner";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductList from "../Product/ProductList";
import ProductListSearch from "../Product/ProductListSearch";

function Home({ filter }) {
  const [priceFilter, setPriceFilter] = useState(null);
  const [promotionFilter, setPromotionFilter] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [filterList, setFilterList] = useState([]);

  const fetchApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/product/get`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
  const listPro = query.data || [];

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

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error fetching data: {query.error.message}</div>;
  }

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
        <Banner />
        <img src="img/banners/blackFriday.gif" alt="" style={{ width: '100%', marginTop: '10px' }} />

        <div className="flexContain">
          <FilterDropdown title="Giá tiền" options={priceRanges} onSelect={setPriceFilter} />
          <FilterDropdown title="Khuyến mãi" options={promotions} onSelect={setPromotionFilter} />
          <FilterDropdown title="Sắp xếp" options={sortOptions} onSelect={setSortOption} />
        </div>

        <ChosenFilters />
        
        <div className="contain-khungSanPham" style={{ display: filter ? 'none' : 'block' }}>
          {filterList.length > 0 && filterList.map((item, index) => (
            <ProductList key={index} listPro={filterList} />
          ))}
        </div>

        <div className="contain-khungSanPham" style={{ display: filter ? 'block' : 'none' }}>
          <ProductListSearch filter={filter} listPro={filterList} />
        </div>
      </div>
    </section>
  );
}

export default Home;
