import React,{useState} from 'react';
import './adminProduct.css'
import ProductItem from './product-item'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery,useQueryClient  } from '@tanstack/react-query';


const ProductsPage = () => {
    
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

      const query = useQuery({ queryKey: ['products'], queryFn: fetchApi });
      const listPro = query.data || [];
      const [filterListPro, setFilterListPro] = useState(listPro);
      if(filter){
        setFilterListPro(listPro.filter((item)=>(item.name === filter)))
      }


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
          {listPro.map((product, index)=>(
                <ProductItem product = {product} key={index} onDelete={handleProductDelete} />
              
          ))}
             
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
