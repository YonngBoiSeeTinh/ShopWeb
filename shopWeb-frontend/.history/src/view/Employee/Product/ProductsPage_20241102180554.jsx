import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import ProductList from './ProductList'
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import { FilterContext } from '../EmployeeLayout';

const ProductsPage = () => {
  const { filter } = useContext(FilterContext);
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
    const listPro = query.data || [];
    const [filterListPro, setFilterListPro] = useState([]);
    console.log(filterListPro);
    useEffect(() => {
      if (filter) {
          setFilterListPro(listPro.filter((item) =>item.name.toLowerCase().includes(filter.toLowerCase())));
      }
    }, [filter, listPro]);
    return (
      <div className="employee-product-container">
         <div style={{display:!filter?"block":"none"}} className='employee_product_list'>
           <ProductList listPro={listPro} />
         </div>  
        <div style={{display:filter?"block":"none"}}  className='employee_product_list'>
            <ProductList listPro={filterListPro}  />
        </div>
       
      </div>
    );
  };

export default ProductsPage;
