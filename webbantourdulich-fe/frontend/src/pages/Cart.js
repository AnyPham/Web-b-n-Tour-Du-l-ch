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
    formatPrice, RATE_QUANTITY_OF_CHILD_WITH_ADULT,
} from "../utils/utill";
import {removeCartTourFromLocal, updateCartTourInLocal, user} from "../utils/localStorageUtils";

export const Cart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Lấy danh sách các tour trong giỏ hàng từ Redux store
    const cartItems = useSelector((state) => state.carts);

    // Lấy thông tin về tour được chọn từ Redux store
    const selectedTour = useSelector((state) => state.selectedTour);


    const dispatch = useDispatch();

    // Trạng thái khỏi tạo của tour được chọn (selectedItemId)
    const [selectedItemId, setSelectedItemId] = useState(selectedTour ? selectedTour.id : null);

    const navigate = useNavigate();

    // xóa tour khỏi giỏ
    const handleDelete = (id) => {
        dispatch(removeCart(id)); // Gửi action xóa từ Redux store

        // xóa khỏi local
        removeCartTourFromLocal(id)

        // nếu tour này có trong tour đã chọn thì xóa 
        if (selectedTour && selectedTour.id === id) {
            dispatch(clearSelectedTour())
            setQuantityAdult(null);
            setQuantityChild(null);
        }
    };

    //tính tổng tiền các tour có trong giỏ
    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            if (item.tour.priceAdult) {
                const quantityChild = item.quantityChild !== null ? item.quantityChild : 0;
                const priceAdult = parseFloat(item.tour.priceAdult);
                const priceChild = parseFloat(item.tour.priceChild);
                total += priceAdult * item.quantityAdult + priceChild * quantityChild;
            }
        });
        // trả về định dạng tiền VN
        return total
    };

    // tính tổng tiền tour được chọn
    const calculateTourSelected = () => {
        let total = 0;
        cartItems.forEach((item) => {
            if (item.id === selectedItemId) {
                const qChild = quantityChild !== null ? quantityChild : 0;
                const priceAdult = parseFloat(item.tour.priceAdult);
                const priceChild = parseFloat(item.tour.priceChild);
                total += priceAdult * quantityAdult + priceChild * qChild;
            }
        });
        // trả về định dạng tiền VN
        return total
    };


    // ô input nhập số lượng hành khách
    const [quantityAdult, setQuantityAdult] = useState(() => {
        const result = !selectedTour ? null : selectedTour.quantityAdult
        return result;
    })
    const [quantityChild, setQuantityChild] = useState(() => {
        const result = !selectedTour ? null : selectedTour.quantityChild
        return result;
    })

    const maxAdults = selectedItemId !== null ? cartItems.find((item) => item.id === selectedItemId)?.tour.quantity - quantityChild : 0;
    const maxChildren = selectedItemId !== null ? cartItems.find((item) => item.id === selectedItemId)?.tour.quantity - quantityAdult : 0;

    // Hàm xử lý khi người dùng kích chuột vào ô input khi chưa được tick chọn
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
        // nếu số lượng người lớn mà == null ( mặc định bằng 1) thì reset lại child == null (mặc định bằng 0)
        if (isNaN(value) || !selectedTour) {
            setQuantityAdult(null);
            setQuantityChild(null);
            return;
        }
        // nếu giá trị nhập > số lượng cho phép thì thông báo đồng thời xét max giá trị
        else if (maxAdults !== null && value > maxAdults) {
            setQuantityAdult(maxAdults);
            Swal.fire({
                title: "Thông báo",
                text: "Số lượng không được vượt quá giới hạn cho phép.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
            // nếu sl người lớn mà nhỏ hơn tỉ lệ quy định
            // sự chênh lệch giữa sl người lớn và trẻ em (RATE_QUANTITY_OF_CHILD_WITH_ADULT)
        // thì set lại = tổng sl người lớn + chênh lệch
        else if (value < quantityChild - RATE_QUANTITY_OF_CHILD_WITH_ADULT) {
            setQuantityChild(quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT)
            Swal.fire({
                title: "Thông báo",
                text: `Số trẻ em chỉ được lớn hơn ${RATE_QUANTITY_OF_CHILD_WITH_ADULT} người so với người lớn!`,
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        // nếu nhập giá trị bằng 0 thì set về 1
        else if (value == 0) {
            setQuantityAdult(1);
            Swal.fire({
                title: "Thông báo",
                text: "Số lượng người lớn phải từ 1 trở lên.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else {
            //trường hợp hợp lệ
            setQuantityAdult(value);
        }
    };

    const handleChildQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || !selectedTour) {
            setQuantityChild(null)
            return
        }
            // nếu giá trị nhập nhỏ hơn or bằng mức qui định và giá trị này phải < hơn or =
        // mức chênh lệch sl người lớn và trẻ em thì lấy giá trị này
        else if (value <= maxChildren && value <= quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT) {
            setQuantityChild(value);
        }
            // nếu lớn hơn mức chênh lệch thì thông báo và set lại giá trị bằng số lượng chỗ còn lại
        // hoặc cũng có thể là đúng theo tỉ lệ
        else if (value > quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT) {
            setQuantityChild(quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT > maxChildren ? maxChildren : quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT)
            Swal.fire({
                title: "Thông báo",
                text: `Số trẻ em chỉ được lớn hơn ${RATE_QUANTITY_OF_CHILD_WITH_ADULT} người so với người lớn!`,
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        // ngược lại thì set giá trị lớn nhất của sl trẻ em có thể có
        else {
            setQuantityChild(maxChildren)
            Swal.fire({
                title: "Thông báo",
                text: "Số lượng không được vượt quá giới hạn cho phép.",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };
    // hàm xử lý thay đổi số lượng hành khách
    const handleQuantityChange = (itemId, quantityAdult, quantityChild) => {
        // cập nhật tour trong cart redux
        dispatch(updateCart({
            idCard: itemId,
            quantityAdult: quantityAdult,
            quantityChild: quantityChild,
            total_price: calculateTourSelected()
        }));
        // cập nhật tour được chọn
        dispatch(updateSelectedTour({
            quantityAdult: quantityAdult,
            quantityChild: quantityChild,
            total_price: calculateTourSelected()}));
        updateCartTourInLocal(itemId, quantityAdult, quantityChild, calculateTourSelected())
    };


    // hàm xử lý tour được chọn để tiến hành thanh toán
    const handleSelection = (itemId) => {
        const selectedTour = cartItems.find((item) => item.id === itemId);
        // nếu có tour được chọn thì set lại ô input với số lượng người lớn và trẻ em trong tour đó
        if (selectedTour) {
            setQuantityChild(selectedTour.quantityChild);
            setQuantityAdult(selectedTour.quantityAdult);
        } else {
            setQuantityChild(null);
            setQuantityAdult(null);
        }
        // nếu không được chọn thì clear Selectour đi
        if (itemId === null) {
            dispatch(clearSelectedTour());
        }
        // chọn lại tour này vào redux
        setSelectedItemId(itemId);
        dispatch(setSelectedTour(cartItems.find((item) => item.id === itemId)));
    };

    // gọi hàm handleQuantityChange khi 1 trong 2 ô nhập thay đổi số lượng
    useEffect(() => {
        if (selectedItemId && (quantityAdult !== null || quantityChild !== null)) {
            handleQuantityChange(selectedItemId, quantityAdult, quantityChild);
        }
    }, [selectedItemId, quantityAdult, quantityChild]);

    const handCheckIsLogin = ()=> {
        const isAuthenticated = user; // Kiểm tra trạng thái đăng nhập
        if(!selectedTour){
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng tick chọn tour mà bạn cần thanh toán!",
                icon: "success",
                confirmButtonText: "OK",
            });
            return;
        }
        else if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi thanh toán",
                icon: "warning",
                confirmButtonText: "OK",
            });
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
        } else navigate('/booking')
    }
    return (
        <>
            <Navbar/>
            <div className="bg-white">
            <div className="container ">
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
                                <div className={`overflow-auto overflow-cart scrollbar ${ cartItems.length > 0 ?'':'d-flex justify-content-center align-items-center'}`}>
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
                                        placeholder={`${selectedTour !== null ? cartItems.find((item) => item.id === selectedTour.id)?.tour.priceAdult : ""} x số người lớn`}
                                        inputMode="numeric"
                                        min="1"
                                        max={maxAdults}
                                        value={quantityAdult === null ? "" : quantityAdult}
                                        onMouseDown={handleInputFocus}
                                        onChange={handleAdultQuantityChange}
                                    />
                                </div>
                                <div className="d-flex justify-content-between information">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="name"
                                        inputMode="numeric"
                                        placeholder={`${selectedTour !== null ? cartItems.find((item) => item.id === selectedTour.id)?.tour.priceChild : ""} x số trẻ em từ 2 đến 7 tuổi`}
                                        min="0"
                                        max={maxChildren}
                                        value={quantityChild === null ? "" : quantityChild}
                                        onMouseDown={handleInputFocus}
                                        onChange={handleChildQuantityChange}
                                    />
                                </div>

                                <div className="d-flex justify-content-between information">
                                    <span>Tổng tiền giỏ hàng:</span>
                                    <span>{formatPrice(calculateTotal())}đ</span>
                                </div>
                                {selectedTour ? (<>
                                    <div className="d-flex justify-content-between information">
                                        <span>Giá vé cho người lớn:</span>
                                        <span>{formatPrice(selectedTour.tour.priceAdult)}đ</span>
                                    </div>
                                    <div className="d-flex justify-content-between information">
                                        <span>Giá vé cho trẻ em:</span>
                                        <span>{formatPrice(selectedTour.tour.priceChild)}đ</span>
                                    </div>
                                    <div className="d-flex justify-content-between information">
                                        <span>Tổng tiền tour được chọn:</span>
                                        <span>{formatPrice(calculateTourSelected())}đ</span>
                                    </div>
                                </>) : ""}
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
        </>);
};