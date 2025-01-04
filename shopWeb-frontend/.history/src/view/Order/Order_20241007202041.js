// Hàm fetch dữ liệu đơn hàng
const fetchApi = async () => {
  try {
    const res = await axios.get(`http://localhost:3001/api/order/getByUserId/${user.id}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Sử dụng react-query để fetch dữ liệu
const query = useQuery({ queryKey: ['orders'], queryFn: fetchApi });

const queryData = query.data || []; // Dữ liệu lấy về hoặc mảng rỗng nếu không có dữ liệu

// Hiển thị danh sách đơn hàng
{queryData.map((order, index) => (
  <Order order={order} key={index} />
))}

// Component Order
function Order({ order }) {
  console.log(order);
  return (
    <div className="order-item">
      <h4 className="order-name">Sản phẩm: {order.name}</h4>
      <div className="order-details">
        <div className="order-image">
          <img src={order.image} alt={order.name} /> {/* Hiển thị hình ảnh sản phẩm */}
        </div>

        <div>Màu: {order.color}</div>
        <div className="order-price">{order.totalPrice} đ</div>
        <div className="quantity-order">
          Số lượng: {order.amount}
        </div>
        <div className="order-status">
          {order.accept ? "Đã xác nhận" : "Chưa xác nhận"}
        </div>
        <button className="deleteItem">Hủy</button>
      </div>
    </div>
  );
}

export default Order;
