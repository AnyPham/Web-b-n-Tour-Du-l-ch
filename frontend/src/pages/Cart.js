import {Link, useNavigate} from "react-router-dom";
import {CartItem} from "../components/CartItem";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/cart.scss";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeCart, updateCart} from "../redux/slices/CartsSlice";
import {clearSelectedTour, setSelectedTour, updateSelectedTour} from "../redux/slices/SelectedTourSlice";
import Swal from "sweetalert2";
import {
    formatPrice,
} from "../utils/utill";
import {removeCartTourFromLocal, updateCartTourInLocal, user} from "../utils/localStorageUtils";

export const Cart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const cartItems = useSelector((state) => state.carts);
    const selectedTour = useSelector((state) => state.selectedTour);

    const dispatch = useDispatch();

    const [selectedItemId, setSelectedItemId] = useState(selectedTour ? selectedTour.id : null);

    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(removeCart(id));
        removeCartTourFromLocal(id);

        if (selectedTour && selectedTour.id === id) {
            dispatch(clearSelectedTour());
            setQuantityAdult(null);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            if (item.tour.priceAdult) {
                const priceAdult = parseFloat(item.tour.priceAdult);
                total += priceAdult * item.quantityAdult;
            }
        });
        return total;
    };

    const calculateTourSelected = () => {
        let total = 0;
        cartItems.forEach((item) => {
            if (item.id === selectedItemId) {
                const priceAdult = parseFloat(item.tour.priceAdult);
                total += priceAdult * quantityAdult;
            }
        });
        return total;
    };

    const [quantityAdult, setQuantityAdult] = useState(() => {
        const result = !selectedTour ? null : selectedTour.quantityAdult;
        return result;
    });

    const maxAdults = selectedItemId !== null ? cartItems.find((item) => item.id === selectedItemId)?.tour.quantity : 0;

    const handleInputFocus = () => {
        if (!selectedTour) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng tick chọn tour để thay đổi số lượng!",
                icon: "info",
                confirmButtonText: "OK",
            });
        }
    };

    const handleAdultQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || !selectedTour) {
            setQuantityAdult(null);
            return;
        } else if (maxAdults !== null && value > maxAdults) {
            setQuantityAdult(maxAdults);
            Swal.fire({
                title: "Thông báo",
                text: "Số lượng không được vượt quá giới hạn cho phép.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else if (value == 0) {
            setQuantityAdult(1);
            Swal.fire({
                title: "Thông báo",
                text: "Số lượng người lớn phải từ 1 trở lên.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else {
            setQuantityAdult(value);
        }
    };

    const handleQuantityChange = (itemId, quantityAdult) => {
        dispatch(updateCart({
            idCard: itemId,
            quantityAdult: quantityAdult,
            total_price: calculateTourSelected()
        }));
        dispatch(updateSelectedTour({
            quantityAdult: quantityAdult,
            total_price: calculateTourSelected()
        }));
        updateCartTourInLocal(itemId, quantityAdult, calculateTourSelected());
    };

    const handleSelection = (itemId) => {
        const selectedTour = cartItems.find((item) => item.id === itemId);
        if (selectedTour) {
            setQuantityAdult(selectedTour.quantityAdult);
        } else {
            setQuantityAdult(null);
        }
        if (itemId === null) {
            dispatch(clearSelectedTour());
        }
        setSelectedItemId(itemId);
        dispatch(setSelectedTour(cartItems.find((item) => item.id === itemId)));
    };

    useEffect(() => {
        if (selectedItemId && quantityAdult !== null) {
            handleQuantityChange(selectedItemId, quantityAdult);
        }
    }, [selectedItemId, quantityAdult]);

    const handCheckIsLogin = () => {
        const isAuthenticated = user;
        if (!selectedTour) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng tick chọn tour mà bạn cần thanh toán!",
                icon: "success",
                confirmButtonText: "OK",
            });
            return;
        } else if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            navigate('/login');
            return;
        } else navigate('/booking');
    };

    return (
        <>
            <Navbar/>
            <div className="bg-white">
                <div className="container">
                    <div className="container mt-5 p-3 rounded cart">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex flex-row align-items-center">
                                    <i className="fas fa-arrow-left"></i>
                                    <Link to={'/'}>
                                        <span className="ml-2">Tiếp tục thêm</span>
                                    </Link>
                                </div>
                                <hr/>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-md-8">
                                <div className="product-details mr-2">
                                    <h4 className="mb-0 mb-2 item-title-cart">Giỏ hàng</h4>
                                    <div className={`overflow-auto overflow-cart scrollbar ${cartItems.length > 0 ? '' : 'd-flex justify-content-center align-items-center'}`}>
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item) => (
                                                <CartItem
                                                    item={item}
                                                    handleDelete={handleDelete}
                                                    selectedItemId={selectedItemId}
                                                    handleSelection={handleSelection}
                                                    key={item.id}
                                                />
                                            ))
                                        ) : (
                                            <h5 className="d-flex justify-content-center align-items-center"><i>Chưa có gì trong giỏ!</i></h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mt-2">
                                <h4 className="mb-0 mb-2 item-title-cart">Chi tiết</h4>
                                <div className="total-info">
                                    <div className="d-flex justify-content-between information">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="name"
                                            placeholder={`${selectedTour !== null ? cartItems.find((item) => item.id === selectedTour.id)?.tour.priceAdult : ""} x số lượng người`}
                                            inputMode="numeric"
                                            min="1"
                                            max={maxAdults}
                                            value={quantityAdult === null ? "" : quantityAdult}
                                            onMouseDown={handleInputFocus}
                                            onChange={handleAdultQuantityChange}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between information">
                                        <span>Tổng tiền giỏ hàng:</span>
                                        <span>{formatPrice(calculateTotal())}đ</span>
                                    </div>
                                    {selectedTour ? (
                                        <>
                                            <div className="d-flex justify-content-between information">
                                                <span>Giá vé cho 1 người:</span>
                                                <span>{formatPrice(selectedTour.tour.priceAdult)}đ</span>
                                            </div>
                                            <div className="d-flex justify-content-between information">
                                                <span>Tổng tiền tour được chọn:</span>
                                                <span>{formatPrice(calculateTourSelected())}đ</span>
                                            </div>
                                        </>
                                    ) : ""}
                                    <button
                                        className="btn btn-begin-checkout btn-block d-flex justify-content-center mt-3 rounded"
                                        type="button"
                                        onClick={handCheckIsLogin}
                                    >
                                        <span>
                                            Tiến hành thanh toán <i className="fas fa-arrow-right ml-1"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};
