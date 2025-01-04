import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import ProductList from './SeeAllProduct'
import { useQuery,useQueryClient  } from '@tanstack/react-query';

const ProductsPage = () => {
  const { filter } = useContext(FilterContext);
  const queryClient = useQueryClient(); // Tạo đối tượng queryClient cap nhat catch khong can gopi API

      const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/product/get`);
            console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
            return res.data.data; // Đảm bảo đây là một mảng
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const query = useQuery({ queryKey: ['products', currentPage], queryFn: fetchApi });
    const listPro = query.data || [];
    const [filterListPro, setFilterListPro] = useState(listPro);

    useEffect(() => {
      if (filter) {
          setFilterListPro(listPro.filter((item) =>item.name.toLowerCase().includes(filter.toLowerCase())));
      } else {
          setFilterListPro(listPro); // Nếu không có filter, hiển thị tất cả
      }
    }, [filter, listPro]);
    return (
      <div className="admin-product-container">
        <ProductList listPro={filterListPro} />
      </div>
    );
  };

export default ProductsPage;
