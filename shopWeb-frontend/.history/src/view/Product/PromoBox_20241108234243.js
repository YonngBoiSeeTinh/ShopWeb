import React from "react";

const PromoBox =({handleAddProduct})=>{
    return (
        <div className="promo-box">
        <p>Online Giá Rẻ Quá</p>
        <div className="area_order">
        <div className="policy">
                    <div>
                        <img src="img/chitietsanpham/box.png"/>
                        <p>Trong hộp có: Sạc, Tai nghe, Sách hướng dẫn, Cây lấy sim, Ốp lưng </p>
                    </div>
                    <div>
                        <img src="img/chitietsanpham/icon-baohanh.png"/>
                        <p>Bảo hành chính hãng 12 tháng.</p>
                    </div>
                    <div className="last">
                        <img src="img/chitietsanpham/1-1.jpg"/>
                        <p>1 đổi 1 trong 1 tháng nếu lỗi, đổi sản phẩm tại nhà trong 1 ngày.</p>
                    </div>
                </div>
                {/* Sự kiện onClick */}
                <a className="buy_now" onClick={handleAddProduct} >
                        <b><i className="fa fa-cart-plus"></i> Thêm vào giỏ hàng</b>
                        <p>Giao trong 1 giờ hoặc nhận tại cửa hàng</p>
                 </a>
                </div>
        </div>
    );
}

export default PromoBox