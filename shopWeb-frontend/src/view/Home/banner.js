import React from "react";
import Slider from "react-slick";  // Import React Slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Link from "antd/es/typography/Link";
const Banner = () => {
    // Cấu hình cho slider
    const settings = {
        dots: true,             // Hiển thị các chấm điều hướng dưới slide
        infinite: true,         // Vòng lặp carousel
        speed: 500,             // Tốc độ chuyển slide (500ms)
        slidesToShow: 1,        // Hiển thị 1 slide trên màn hình
        slidesToScroll: 1,      // Scroll 1 slide mỗi lần
        autoplay: true,         // Tự động chạy carousel
        autoplaySpeed: 1500,    // Thời gian chờ giữa các slide (3 giây)
        arrows: false,           // Hiển thị nút điều hướng
    };

    return (
        <div className="banner">
            <Slider {...settings}>
                {/* {listBanne.map((banner, index)=>(
                 <div className="item">
                    <Link to={`/product/${banner.product}`} >
                        <img src={banner.image} alt="Banner 1" />
                    </Link>
                 </div>
                ))} */}
                <div className="item">
                    <img src="img/banners/banner1.jpg" alt="Banner 1" />
                </div>
                <div className="item">
                    <img src="img/banners/banner2.jpg" alt="Banner 2" />
                </div>
                <div className="item">
                    <img src="img/banners/banner3.jpg" alt="Banner 3" />
                </div>
                
            </Slider>
        </div>
    );
};

export default Banner;
