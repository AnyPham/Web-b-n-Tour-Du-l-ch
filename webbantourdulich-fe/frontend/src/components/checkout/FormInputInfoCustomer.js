import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {isEmailValid, isPassportNumberValid, isPhoneValid} from "../../utils/utill";
import {useNavigate} from "react-router-dom";

export const FormInputInfoCustomer = ({cart, handleContinue}) => {
    const [customerInfo, setCustomerInfo] = useState([]);
    const quantity = cart.quantityAdult + cart.quantityChild;
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user"));
    const isCustomerInfoComplete = (index) => {
        const customer = customerInfo[index];
        // Kiểm tra các trường cần nhập đầy đủ
        if (
            customer &&
            customer.full_name &&
            customer.email &&
            customer.phone &&
            customer.address
        ) {
            if (cart.tour.catagoryId === 2) {
                // Kiểm tra trường thêm nếu là catagoryId === 2
                if (customer.passport_number) {
                    return true; // Các trường đã được nhập đầy đủ
                }
            } else {
                return true; // Các trường đã được nhập đầy đủ
            }
        }

        return false; // Có ít nhất một trường chưa được nhập đầy đủ
    };
    const handleSave = () => {
        // Kiểm tra thông tin khách hàng
        const isComplete = isCustomerInfoComplete(0); // Kiểm tra khách hàng đầu tiên
        const isAuthenticated = user;
        if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
        }
        if (!isComplete) {
            // Hiển thị cảnh báo nếu thông tin chưa đầy đủ
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng nhập đầy đủ thông tin liên hệ!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return; // Dừng thực thi hàm nếu thông tin chưa đầy đủ
        } else {
            const customer = customerInfo[0];
            const phone = customer.phone;
            if (!isPhoneValid(phone)) {
                // Hiển thị cảnh báo nếu số điện thoại không đúng định dạng
                Swal.fire({
                    title: "Thông báo",
                    text: "Số điện thoại phải bắt đầu bằng số 0 và chứa 10 số!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return; // Dừng thực thi hàm nếu số điện thoại không đúng định dạng
            }
            const email = customer.email;
            if (!isEmailValid(email)) {
                // Hiển thị cảnh báo nếu email không đúng định dạng
                Swal.fire({
                    title: "Thông báo",
                    text: "Vui lòng nhập đúng định dạng email!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return; // Dừng thực thi hàm nếu email không đúng định dạng
            }
            if (customer.passport_number) {
                if (!isPassportNumberValid(customer.passport_number)) {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Số hộ chiếu gồm 8 ký tự, bắt đầu bằng 1 chữ in hoa tiếp sau là 7 chữ số!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }
            }
        }

        // Thông tin đã đầy đủ, thực thi hàm handleContinue
        handleContinue(customerInfo);
    };
    const handleInputChange = (index, field, value) => {
        setCustomerInfo((prevState) => {
            const updatedCustomerInfo = [...prevState];
            updatedCustomerInfo[index] = {
                ...updatedCustomerInfo[index],
                [field]: value
            };
            return updatedCustomerInfo;
        });
    };
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);


    const forms = []

    for (let i = 0; i < quantity; i++) {
        let stt = 1 + i;
        forms.push(
            <React.Fragment key={i}>
                {
                    i ? (<>
                            <h3 key={i} className='mt-1'>Thông tin du khách #{stt}</h3>
                            <div className='row'>
                                <div className="col-md-6 mt-1">
                                    <div className="form-group">
                                        <label>Tên :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`full_name-${i}`}
                                            placeholder="Nhập tên"
                                            onChange={(e) =>
                                                handleInputChange(i, "full_name", e.target.value)
                                            }
                                        /></div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id={`email-${i}`}
                                            placeholder="abc@gmail.com"

                                            onChange={(e) => handleInputChange(i, "email", e.target.value)}
                                        />
                                    </div>

                                    {
                                        cart.tour.catagoryId === 2 ?
                                            <div className="form-group">
                                                <label>
                                                    Số hộ chiếu:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`passport_number-${i}`}
                                                    placeholder="A1234567"
                                                    maxLength={8}
                                                    onChange={(e) =>
                                                        handleInputChange(i, "passport_number", e.target.value)
                                                    }
                                                />
                                            </div>

                                            : ""
                                    }
                                </div>
                                <div className='col-md-6 mt-1'>
                                    <div className="form-group">
                                        <label>Số điện thoại:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`phone-${i}`}
                                            placeholder="Nhập số điện thoại"
                                            onChange={(e) =>
                                                handleInputChange(i, "phone", e.target.value)
                                            }
                                        /></div>
                                    <div className="form-group">
                                        <label>Địa chỉ:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`address-${i}`}
                                            placeholder="Nhập địa chỉ"
                                            onChange={(e) =>
                                                handleInputChange(i, "address", e.target.value)
                                            }
                                        /></div>
                                    {
                                        cart.tour.catagoryId === 2 ?
                                            <div className="form-group">
                                                <label>Quốc tịch</label>
                                                <select className="custom-select"
                                                        onBlur={(e) => handleInputChange(i, "nationality", e.target.value)}>
                                                    {countries.map((country) => (
                                                        <option
                                                            key={country.name.common}
                                                            value={country.name.common}
                                                            selected={country.name.common === 'Vietnam'}
                                                        >
                                                            {country.name.common}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            : ""
                                    }
                                </div>
                            </div>
                        </>)
                        :
                        <>
                            <h3>Thông tin liên hệ:<small className="text-light"><i>bắt buộc(<span
                                className="text-danger">*</span>)</i></small></h3>
                            <div className="row ">
                                <div className="col-md-6 mt-1">
                                    <div className="form-group">
                                        <label>Tên (<span className="text-danger">*</span>):</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`full_name-${i}`}
                                            placeholder="Nhập tên"
                                            onChange={(e) =>
                                                handleInputChange(i, "full_name", e.target.value)
                                            }
                                        /></div>
                                    <div className="form-group">
                                        <label>Email(<span className="text-danger">*</span>):</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id={`email-${i}`}
                                            placeholder="abc@gmail.com"
                                            onChange={(e) => handleInputChange(i, "email", e.target.value)}
                                        />
                                    </div>

                                    {
                                        cart.tour.catagoryId === 2 ?
                                            <div className="form-group">
                                                <label>
                                                    Số hộ chiếu(<span className="text-danger">*</span>){" "}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`passport_number-${i}`}
                                                    maxLength={8}
                                                    placeholder="A1234567"
                                                    onChange={(e) =>
                                                        handleInputChange(i, "passport_number", e.target.value)
                                                    }
                                                />
                                            </div>

                                            : ""
                                    }
                                </div>
                                <div className='col-md-6 mt-1'>
                                    <div className="form-group">
                                        <label>Số điện thoại(<span className="text-danger">*</span>):</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`phone-${i}`}
                                            placeholder="0987654321"
                                            onChange={(e) =>
                                                handleInputChange(i, "phone", e.target.value)
                                            }
                                        /></div>
                                    <div className="form-group">
                                        <label>Địa chỉ(<span className="text-danger">*</span>):</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`address-${i}`}
                                            placeholder="Nhập địa chỉ"
                                            onChange={(e) =>
                                                handleInputChange(i, "address", e.target.value)
                                            }
                                        /></div>
                                    {
                                        cart.tour.catagoryId === 2 ?
                                            <div className="form-group">
                                                <label>Quốc tịch</label>
                                                <select className="custom-select"
                                                        onBlur={(e) => handleInputChange(i, "nationality", e.target.value)}>
                                                    {countries.map((country) => (
                                                        <option
                                                            key={country.name.common}
                                                            value={country.name.common}
                                                            selected={country.name.common === 'Vietnam'}
                                                        >
                                                            {country.name.common}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            : ""
                                    }
                                </div>
                            </div>

                        </>
                }
            </React.Fragment>
        );
    }
    return <>{forms}
        <div className="btn btn-block btn-continue-booking rounded" onClick={handleSave}>Tiếp tục</div>
    </>;
}