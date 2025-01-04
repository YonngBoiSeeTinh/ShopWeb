import React,{useState,useContext,useEffect} from 'react';
import './adminProduct.css'
import ProductItem from './product-item'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import { FilterContext } from '../AdminLayout';
import Pagination from '../../Pagination'

const ProductsPage = () => {
  const { filter } = useContext(FilterContext);
  const [totalPage,setTotalPage] = useState(0);
  const [currentPage,setCurrentPage] = useState(0); 

  const queryClient = useQueryClient(); // Tạo đối tượng queryClient cap nhat catch khong can gopi API

      const fetchApi = async () => {
          try {
              const res = await axios.get(`http://localhost:3001/api/product/get`);
              console.log('API Response:', res.data); // Kiểm tra dữ liệu trả về
              setTotalPage(res.data.totalPage*10)
              return res.data.data; // Đảm bảo đây là một mảng
          } catch (error) {
              console.error('Error fetching data:', error);
              throw error;
          }
      };

      const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
      const listPro = query.data || [];
      const [filterListPro, setFilterListPro] = useState(listPro);

      useEffect(() => {
        if (filter) {
            setFilterListPro(listPro.filter((item) =>item.name.toLowerCase().includes(filter.toLowerCase())));
        } else {
            setFilterListPro(listPro); // Nếu không có filter, hiển thị tất cả
        }
    }, [filter, listPro]);


      const handleProductDelete = async (deletedProductId) => {
          const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
          if (confirmDelete) {
              try {
                  await axios.delete(`http://localhost:3001/api/product/delete/${deletedProductId}`);
                  alert("Sản phẩm đã được xóa thành công!");
                  // Refetch data after delete
                  queryClient.invalidateQueries(['products']); // Invalidate and refetch products
              } catch (error) {
                  console.error('Error deleting product:', error);
                  alert("Có lỗi xảy ra khi xóa sản phẩm.");
              }
          }
      };
    return (
      <div className="admin-product-container">
        <div className="admin-product-list">
          {filterListPro.map((product, index)=>(
                <ProductItem product = {product} key={index} onDelete={handleProductDelete} />       
          ))}
           <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} ></Pagination>       
        </div>
      <Link to="/admin/addProduct">
          <div className='btnAdd'>
            Them san pham
          </div>
      </Link>
      </div>
    );
  };

export default ProductsPage;
