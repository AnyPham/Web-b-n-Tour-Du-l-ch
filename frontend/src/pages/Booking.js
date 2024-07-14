import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {useEffect, useState} from "react";
import {FormInputInfoCustomer} from "../components/checkout/FormInputInfoCustomer";
import {Process} from "../components/Process";
import '../styles/process.scss'
import '../styles/booking.scss'
import {useDispatch, useSelector} from "react-redux";
import {setSelectedTour} from "../redux/slices/SelectedTourSlice";
import {saveInfoPassenger} from "../redux/slices/CheckoutSlice";
import {useNavigate} from "react-router-dom";
import {ItemTourCheckout} from "../components/checkout/ItemTourCheckout";
import Swal from "sweetalert2";

export const Booking = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const selectedTour = useSelector((state) => state.selectedTour);
    const [step, setStep] = useState(3);
    const checkout = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    const checkoutStore = JSON.parse(localStorage.getItem("checkout")) || []
    const count =checkoutStore.length;
    const [passengerInfo, setPassengerInfo] = useState([]);
    const [isInitialRender, setIsInitialRender] = useState(true);

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

            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
            // Chuyển hướng nếu không đăng nhập
        } else if (!selectedTour) {
            navigate('/cart'); // Chuyển hướng nếu không có selectedTour
        }
    }, []);

    const handleContinue = (listPassengerInfo) => {
        setPassengerInfo(listPassengerInfo);
        setIsInitialRender(false);
    };
    useEffect(() => {

        if (!isInitialRender) {
            try {
                const checkoutData = {
                    id : count,
                    user_id: user.id ? user.id:0,
                    tour: selectedTour.tour,
                    quantityAdult: selectedTour.quantityAdult,
                    total_price: selectedTour.total_price,
                    payment_method: "Phương thức thanh toán",
                    status: "pending",
                    passenger_details: passengerInfo,
                };
                dispatch(saveInfoPassenger(checkoutData));

                // chuyển hướng đên trang chọn phương thức thanh toán
                navigate("/payment");
            } catch (error) {
                console.error(error);
            }
        }
    }, [isInitialRender]);


    useEffect(() => {
        dispatch(setSelectedTour(selectedTour));
    }, [selectedTour, dispatch]);

    return (
        <>
            <Navbar/>
            <Process step={step}/>
            <div className="bg-white">
            <div className="container pb-3 mt-2 rounded" id="booking" >
                <div className="row flex-wrap">
                    <div className="col-md-8 mt-4 ">

                        {selectedTour ? (
                            <FormInputInfoCustomer cart={selectedTour} handleContinue={handleContinue}/>
                        ) : (
                            <h3 className="text-danger">
                                <i className="fas fa-arrow-right ml-1"></i> Không có tour nào để
                                thanh toán
                            </h3>
                        )}

                    </div>
                    <div className="mt-4 col-md-4 ">

                        {
                            selectedTour ? <ItemTourCheckout selectedTour = {selectedTour}/> :""
                        }

                    </div>
                </div>
            </div>
            </div>
            <Footer/>
        </>
    );
};
