import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddressForm({ address = "", setAddress }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

   
    // Fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://open.oapi.vn/location/provinces?page=0&size=63');
                setProvinces(response.data.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);
    const [selectedProvince, setSelectedProvince] = useState(provinces.find(p => p.name === address.split(', ')[0]) || ''); // tỉnh/thành phố
   
    // Fetch districts based on selected province
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const response = await axios.get(`https://open.oapi.vn/location/districts/${selectedProvince}`);
                    setDistricts(response.data.data);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };
        fetchDistricts();
        setWards([]);
        setSelectedDistrict('');
        setSelectedWard('');
    }, [selectedProvince]);
    const [selectedDistrict, setSelectedDistrict] = useState(address.split(', ')[1] || ''); // quận/huyện
    
    // Fetch wards based on selected district
    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const response = await axios.get(`https://open.oapi.vn/location/wards/${selectedDistrict}`);
                    setWards(response.data.data);
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            }
        };
        fetchWards();
        setSelectedWard('');
    }, [selectedDistrict]);
    const [selectedWard, setSelectedWard] = useState(address.split(', ')[2] || ''); // phường/xã
    const [detailAddress, setDetailAddress] = useState(address.split(', ')[3] || ''); // chi tiết
    const handleSave = () => {
        const provinceName = provinces.find(p => p.id === selectedProvince)?.name || '';
        const districtName = districts.find(d => d.id === selectedDistrict)?.name || '';
        const wardName = wards.find(w => w.id === selectedWard)?.name || '';
        
        const fullAddress = `${provinceName}, ${districtName}, ${wardName},${detailAddress}`;
        console.log('Full address:', fullAddress);
        setAddress(fullAddress);
    };
   
    return (
        <div className='form-address'>
            <div className="form-group">
                <label>Tỉnh/Thành phố</label>
                <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}
                  className='input'>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {Array.isArray(provinces) && provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Quận/Huyện</label>
                <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className='input' disabled={!selectedProvince}>
                    <option value="">Chọn Quận/Huyện</option>
                    {Array.isArray(districts) && districts.map((district) => (
                        <option key={district.id} value={district.id}>
                            {district.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Phường/Xã</label>
                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className='input' disabled={!selectedDistrict}>
                    <option value="">Chọn Phường/Xã</option>
                    {Array.isArray(wards) && wards.map((ward) => (
                        <option key={ward.id} value={ward.id}>
                            {ward.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Chi tiết</label>
                <input type='text' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} className='input'/>
            </div>

            <button onClick={handleSave} className="submit_upt_suer">Lưu Địa Chỉ</button>
        </div>
    );
}

export default AddressForm;
