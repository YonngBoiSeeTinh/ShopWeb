import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddressForm({ address, setAddress, handleSaveAddress }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(address.split(', ')[0] || ''); // tỉnh/thành phố
    const [selectedDistrict, setSelectedDistrict] = useState(address.split(', ')[1] || ''); // quận/huyện
    const [selectedWard, setSelectedWard] = useState(address.split(', ')[2] || ''); // phường/xã
    const [detailAddress, setDetailAddress] = useState(address.split(', ')[3] || ''); // chi tiết

    console.log("Initial address:", address);

    // Fetch provinces
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://vapi.vnappmob.com/api/province/');
                setProvinces(response.data.results);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch districts based on selected province
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedProvince) {
                try {
                    const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`);
                    setDistricts(response.data.results);
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

    // Fetch wards based on selected district
    useEffect(() => {
        const fetchWards = async () => {
            if (selectedDistrict) {
                try {
                    const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`);
                    setWards(response.data.results);
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            }
        };
        fetchWards();
        setSelectedWard('');
    }, [selectedDistrict]);

    const handleSave = () => {
        const provinceName = provinces.find(p => p.province_id === selectedProvince)?.province_name || '';
        const districtName = districts.find(d => d.district_id === selectedDistrict)?.district_name || '';
        const wardName = wards.find(w => w.ward_id === selectedWard)?.ward_name || '';
        
        const fullAddress = `${detailAddress}, ${wardName}, ${districtName}, ${provinceName}`;
        setAddress(fullAddress);
        console.log('Full address:', fullAddress);
        handleSaveAddress(fullAddress);
    };

    return (
        <div className='form-address'>
            <div className="form-group">
                <label>Tỉnh/Thành phố</label>
                <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}
                  className='input'>
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map((province) => (
                        <option key={province.province_id} value={province.province_id}>
                            {province.province_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Quận/Huyện</label>
                <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className='input' disabled={!selectedProvince}>
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                        <option key={district.district_id} value={district.district_id}>
                            {district.district_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Phường/Xã</label>
                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className='input' disabled={!selectedDistrict}>
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                        <option key={ward.ward_id} value={ward.ward_id}>
                            {ward.ward_name}
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
