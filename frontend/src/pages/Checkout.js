import {useEffect, useState} from "react";
import {Process} from "../components/Process";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {ItemTourCheckout} from "../components/checkout/ItemTourCheckout";
import {useDispatch, useSelector} from "react-redux";
import {removeCheckout, updateStatusPayment} from "../redux/slices/CheckoutSlice";
import {
    isNumericString,
    METHOD_1,
    METHOD_2,
    METHOD_3,
    METHOD_4
} from "../utils/utill";
import Swal from "sweetalert2";
import {addCheckoutToLocal, removeCartTourFromLocal} from "../utils/localStorageUtils";
import {clearSelectedTour} from "../redux/slices/SelectedTourSlice";
import {removeCart} from "../redux/slices/CartsSlice";
import {Link, useNavigate} from "react-router-dom";


export const Checkout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const selectedTour = useSelector((state) => state.selectedTour);

    useEffect(() => {
        const isAuthenticated = user; // Kiểm tra trạng thái đăng nhập

        if (!isAuthenticated && !selectedTour) {
            navigate('/cart'); // Chuyển hướng nếu không đăng nhập và không có selectedTour
        } else if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            dispatch(removeCheckout(checkout.id))
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
        } else if (!selectedTour) {
            navigate('/cart'); // Chuyển hướng nếu không có selectedTour
        }
    }, []);

    const [step, setStep] = useState(5);
    const [countries, setCountries] = useState([]);
    const [expiration, setExpiration] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCVC] = useState('');
    const [country, setCountry] = useState('Vietnam');
    const dispatch = useDispatch();

    let checkout = useSelector((state) => state.checkout);
    checkout = checkout[checkout.length - 1] || {};
    let id = 0;
    switch (checkout.payment_method) {
        case METHOD_1:
            id = 1
            break;
        case METHOD_2:
            id = 2
            break;
        case METHOD_3:
            id = 3
            break;
        case METHOD_4:
            id = 4
            break;
        default:
            id = 0;
    }
    const handleConfirmCheckout = () => {
        let status;
        const isAuthenticated = JSON.parse(localStorage.getItem("user")); // Kiểm tra trạng thái đăng nhập

       if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            dispatch(removeCheckout(checkout.id))
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
       }
        if (id === 0) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng chọn phương thức trước khi xác nhận thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }
        if (id === 1) status = "Chờ thanh toán"
        if (id === 2) {
            if (cardNumber && expiration && cvc && country) {
                if (cardNumber.length !== 19) {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Số thẻ tín dụng phải đủ 16 số!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }
                if (cvc.length !== 3) {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Số CVC phải đủ 3 số!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }
                if (!isNumericString(cardNumber)) {
                    Swal.fire({
                        title: "Thông báo",
                        text: "Số thẻ tín dụng phải là 1 dãy số",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                    return;
                }
                status = "Đã thanh toán"
            } else {
                Swal.fire({
                    title: "Thông báo",
                    text: "Vui lòng nhập đầy đủ thông tin trước khi thanh toán!",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                return;
            }
        }
        if (id === 3) status = "Chờ thanh toán"
        if (id === 4) status = "Chờ thanh toán"
        const newCheckout = {
            ...checkout,
            status: status
        }
        // cập nhật trạng thái của hóa đơn
        dispatch(updateStatusPayment(newCheckout))
        // thêm vào local store
        addCheckoutToLocal(newCheckout)
        //xóa sản phẩm khỏi giỏ hàng trong localstorage
        removeCartTourFromLocal(checkout.tour.idCard)
        //xóa tour được chọn để thanh toán trong redux
        dispatch(clearSelectedTour())
        // xóa sản phẩm khỏi giỏ hảng redux
        dispatch(removeCart(checkout.tour.idCard))
        // xóa hóa đơn trong redux khi đã lưu trong localstorage
        dispatch(removeCheckout(checkout.id))
        // đánh dấu hoàn thành trên thanh process
        setStep(6)
        // gán lại id;
        id = 0;
        Swal.fire({
            title: "Thông báo",
            text: "Xác nhận giao dịch thành công!.Quý khách vui lòng kiểm tra email để biết thêm thông tin!",
            icon: "success",
            confirmButtonText: "OK",
        });
        return;
    }


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


    const handleCVCChange = (e) => {
        const value = e.target.value;
        const truncatedValue = value.slice(0, 3); // Giới hạn độ dài 3 số
        setCVC(truncatedValue);
    };
    const handleExpirationChange = (e) => {
        const value = e.target.value;
        const truncatedValue = value.slice(0, 7); // Giới hạn độ dài 7 kí tự
        setExpiration(truncatedValue);
    };

    return (
        <>
            <Navbar/>
            <Process step={step}/>
            <div className="bg-white">
            <div className="container pt-3 pb-3 mt-2 rounded" id="checkout">
                <div className="row">
                    <div className="col-md-8 mt-3">
                        {
                            id ?
                                id === 3 ? <div className="bg-light p-3">
                                                <p>Quý khách vui lòng chuyển khoản đến số tài khoản ngân hàng Agribank:<strong
                                                    className="border text-primary"> 4303 205 251 458</strong> để thanh toán</p>
                                                <p>Thời gian hết hạn thanh toán: Sau 7 ngày kể từ ngày xác nhận thanh toán!</p>
                                                <p>Sau khi thanh toán xong. Chúng tôi sẽ gửi mail xác nhận đến bạn!</p>
                                                <p>Chúc bạn có những khoảnh khắc vui vẻ khi trải nghiệm dịch vụ của chúng
                                                    tôi!</p>
                                            </div> :

                                            id === 4 ? <div className="bg-light p-3">
                                                    <p>Quý khách vui lòng đến địa chỉ:<strong
                                                        className="border text-primary"> 18/43 tổ 5, khu phố 6, phường Linh Trung, TP.Thủ Đức, HCM</strong> để thanh toán</p>
                                                    <p>Thời gian hết hạn thanh toán: Sau 7 ngày kể từ ngày xác nhận thanh
                                                        toán!</p>
                                                    <p>Sau khi thanh toán xong. Chúng tôi sẽ gửi mail xác nhận đến bạn!</p>
                                                    <p>Chúc bạn có những khoảnh khắc vui vẻ khi trải nghiệm dịch vụ của
                                                        chúng tôi!</p>
                                                </div> :""
                                : ""
                        }
                        {
                            id ? <button
                                    className="btn btn-block btn-continue-booking rounded"
                                    onClick={handleConfirmCheckout}>
                                    Xác nhận
                                </button> :
                                ""
                        }
                    </div>
                    <div className="col-md-4 mt-3">
                        {
                            selectedTour ? <ItemTourCheckout selectedTour={selectedTour}/> :
                                ""
                        }
                    </div>

                </div>
                {!id ? (<>
                        <div className="row d-flex justify-content-center">
                            <div className="bg-light col-md-10 rounded mb-2 p-3">
                                <h3 className="text-center text-primary">Xác nhận thành công!</h3>
                                <p>Quý khách vui lòng kiểm tra email để biết thêm thông tin</p>
                                <p>Quý khách có bất kì thắc mắc hoặc vấn để gì hãy liên hệ: <span className="text-primary">0 355 422 160</span> để được tư vấn</p>
                                <p>Rất vui khi được phục vụ quý khách</p>
                                <p>Xin cảm ơn!</p>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-12 d-flex justify-content-around flex-wrap">
                                <Link to={'/'}>
                                    <button
                                        className="btn btn-block btn-continue-booking rounded">
                                        Trở về trang chủ
                                    </button>
                                </Link>
                                <Link to={'/cart'}>
                                    <button
                                        className="btn btn-block btn-amber btn-continue-booking rounded">
                                        Tiếp tục mua tour
                                    </button>
                                </Link>
                                <Link to={'/Booked'}>
                                    <button
                                        className="btn btn-block pr-5 pl-5 btn-continue-booking rounded">
                                        Tour đã đặt
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </>)
                    : ""
                }
            </div>
                </div>
            <Footer/>
        </>
    )
}