import React from "react";

function CompanyLogo() {
    const companies = [
        "Apple.jpg", "Samsung.jpg", "Oppo.jpg", "Nokia.jpg", "Huawei.jpg", "Xiaomi.png",
        "Realme.png", "Vivo.jpg", "Philips.jpg", "Mobell.jpg", "Mobiistar.jpg", "Itel.jpg",
        "Coolpad.png", "HTC.jpg", "Motorola.jpg"
    ];

    return (
        <div className="companyMenu group flexContain">
            {companies.map((company, index) => {
                const nameCompany = company.slice(0, company.lastIndexOf('.')); // Tạo tên công ty từ tên file
                const imgSrc = `img/company/${company}`; // Đường dẫn ảnh

                return (
                    <a key={index} href={`#${nameCompany}`}>
                        <img src={imgSrc} alt={nameCompany} />
                    </a>
                );
            })}
        </div>
    );
}

export default CompanyLogo;
