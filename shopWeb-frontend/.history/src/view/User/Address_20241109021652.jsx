import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddressForm() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        // Lấy danh sách tỉnh/thành phố từ API
        axios.get('API_URL_TO_GET_PROVINCES')
            .then(response => setProvinces(response.data))
            .catch(error => console.error("Error fetching provinces:", error));
    }, []);

    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        setSelectedDistrict(''); // Reset huyện/quận khi tỉnh/thành phố thay đổi
        setSelectedWard('');     // Reset phường/xã khi tỉnh/thành phố thay đổi

        // Gọi API lấy danh sách huyện/quận dựa trên tỉnh/thành phố đã chọn
        try {
            const response = await axios.get(`API_URL_TO_GET_DISTRICTS_BY_PROVINCE/${provinceId}`);
            setDistricts(response.data);
            setWards([]); // Xóa danh sách phường/xã khi tỉnh/thành phố thay đổi
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setSelectedWard(''); // Reset phường/xã khi huyện/quận thay đổi

        // Gọi API lấy danh sách phường/xã dựa trên huyện/quận đã chọn
        try {
            const response = await axios.get(`API_URL_TO_GET_WARDS_BY_DISTRICT/${districtId}`);
            setWards(response.data);
        } catch (error) {
            console.error("Error fetching wards:", error);
        }
    };

    const handleWardChange = (e) => {
        setSelectedWard(e.target.value);
    };

    return (
        <div>
            <h2>Chọn địa chỉ của bạn</h2>
            <label>
                Tỉnh/Thành phố:
                <select value={selectedProvince} onChange={handleProvinceChange}>
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map(province => (
                        <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                </select>
            </label>

            <label>
                Quận/Huyện:
                <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
                    <option value="">Chọn quận/huyện</option>
                    {districts.map(district => (
                        <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                </select>
            </label>

            <label>
                Phường/Xã:
                <select value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                    <option value="">Chọn phường/xã</option>
                    {wards.map(ward => (
                        <option key={ward.id} value={ward.id}>{ward.name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default AddressForm;
