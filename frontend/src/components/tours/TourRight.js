import {Done, ErrorOutline, ChildCare} from '@mui/icons-material'
import React, {useEffect, useState} from 'react'
import {formatPrice, RATE_QUANTITY_OF_CHILD_WITH_ADULT} from '../../utils/utill'
import {useDispatch, useSelector} from "react-redux";
import {addCart, removeCart} from "../../redux/slices/CartsSlice";
import {addCartTourToLocal, removeCartTourFromLocal} from "../../utils/localStorageUtils";
import Swal from "sweetalert2";

export default function TourRight({data}) {
    const [id, setId] = useState("")
    const [date, setDate] = useState("")
    const [priceAdult, setPriceAdult] = useState(0)
    const [priceChild, setPriceChild] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [quantityAdult, setQuantityAdult] = useState(1)
    const [quantityChild, setQuantityChild] = useState(0)
    const [tourServices, setTourServices] = useState([])
    let cartItems = useSelector((state) => state.carts);
    const [inCart, setInCart] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        if (data && data.start_date) {
            setId(data.id)
            setPriceAdult(Number(data.price_adult))
            setPriceChild(Number(data.price_child))
            setTotalPrice(Number(data.price_adult))
            setTourServices(data.tour_services)
            setDate(data.start_date)
        }
    }, [data]);


    const maxAdults = data.quantity - quantityChild;
    const maxChildren = data.quantity - quantityAdult - 1;

    const handlePrevAdult = () => {
        if (quantityAdult > 1) {
            if (quantityAdult < quantityChild - RATE_QUANTITY_OF_CHILD_WITH_ADULT) {
                setQuantityChild(quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT)
                setQuantityAdult(quantityAdult + 1)
                setTotalPrice(totalPrice + priceAdult)
            } else {
                setQuantityAdult(quantityAdult - 1)
                setTotalPrice(totalPrice - priceAdult)

            }
        }
    }

    const handleNextAdult = () => {
        setQuantityAdult(quantityAdult + 1)
        if (maxAdults !== null && quantityAdult >= maxAdults) {
            setQuantityAdult(maxAdults);
            Swal.fire({
                title: "Thông báo",
                text: "Số lượng không được vượt quá giới hạn cho phép.",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        } else if (quantityAdult < quantityChild - RATE_QUANTITY_OF_CHILD_WITH_ADULT) {
            setQuantityChild(quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT)
            setQuantityAdult(quantityAdult + 1)
            setTotalPrice(totalPrice + priceAdult)
        } else {
            //trường hợp hợp lệ
            setTotalPrice(totalPrice + priceAdult)
        }
    }

    const handlePrevChild = () => {
        if (quantityChild > 0) {
            setQuantityChild(quantityChild - 1)
            setTotalPrice(totalPrice - priceChild)
        }

    }

    const handleNextChild = () => {
        if (quantityChild <= maxChildren && quantityChild <= quantityAdult + RATE_QUANTITY_OF_CHILD_WITH_ADULT) {
            setQuantityChild(quantityChild + 1)
            setTotalPrice(totalPrice + priceChild)
        }
    }
    useEffect(() => {
    }, [quantityChild])

    const handleAddToCart = () => {
        const cartItem = cartItems.find((item) => item.id === data.id);
        if (cartItem) return;
        const tour = {
            idCard: data.id,
            title: data.name,
            image: data.image,
            time: data.quantity_date,
            date: data.start_date,
            plane: data.vehicle[0].name,
            start: data.star,
            priceAdult: data.price_adult,
            priceChild: data.price_child,
            quantity: data.quantity,
            catagoryId: data.catagoryId
        }
        const newCart = {
            id: data.id,
            tour: tour,
            quantityAdult: quantityAdult,
            quantityChild: quantityChild,
            total_price: totalPrice
        }
        dispatch(addCart(newCart))
        setInCart(true);
        addCartTourToLocal(newCart)
    }
    const handleRemoveFromCart = () => {
        dispatch(removeCart(data.id));
        // Gửi action 'removeCart' với idCard của mặt hàng tới Redux store để xóa mặt hàng khỏi giỏ hàng

        setInCart(false);
        // Cập nhật trạng thái inCart thành false (chưa có trong giỏ hàng)

        removeCartTourFromLocal(data.id)
    };
    useEffect(() => {
        const isItemInCart = cartItems.some((item) => item.idCard === data.id);
        // Kiểm tra xem mặt hàng có trong giỏ hàng hay không bằng cách tìm kiếm trong mảng cartItems

        const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
        // Lấy dữ liệu từ localStorage (nếu có) và chuyển đổi từ chuỗi JSON thành mảng

        const isItemStored = storedItems.some((item) => item.id === data.id);
        // Kiểm tra xem mặt hàng có trong mảng dữ liệu từ localStorage hay không

        setInCart(isItemInCart || isItemStored);
        // Cập nhật trạng thái inCart dựa trên kết quả của hai kiểm tra trên
    }, [cartItems, data.id]);
    return (
        <div className='tour-right'>
            <div className='top'>
                <h1 className='title'>Lịch khởi hành & giá</h1>
                <p>Chọn ngày khởi hành:</p>
                <div className='input'>
                    <input
                        value={date}
                        type='text'
                        readOnly
                    />
                </div>
                <div className='couter'>
                    <div className='p-2'>Người lớn</div>
                    <div className='p-2 couter-price'>x {formatPrice(priceAdult)}</div>
                    <div className='wrap-couter'>
                        <div className='prev'
                             onClick={() => handlePrevAdult()}
                        >&#8722;</div>
                        <div className='number'>{quantityAdult}</div>
                        <div className='next'
                             onClick={() => handleNextAdult()}
                        >&#43;</div>
                    </div>
                </div>
                <div className='couter'>
                    <div className='p-2'>Trẻ em</div>
                    <div className='p-2 couter-price'>
                        {
                            quantityChild > 0 &&
                            "x" + formatPrice(priceChild)
                        }
                    </div>
                    <div className='wrap-couter'>
                        <div className='prev'
                             onClick={() => handlePrevChild()}
                        >&#8722;</div>
                        <div className='number'>{quantityChild}</div>
                        <div className='next'
                             onClick={() => handleNextChild()}
                        >&#43;</div>
                    </div>
                </div>
                <div className='note-des'>
                    <ErrorOutline className='icon'/>
                    <span>Liên hệ để xác nhận chỗ</span>
                </div>
                {
                    quantityChild > 0 &&
                    (
                        <div className='note-des ml-1'>
                            {/*<ChildCare/>*/}
                            <span>Trẻ em từ 2 đến 7 tuổi</span>
                        </div>
                    )
                }

                <div className='wrap-price'>
                    <div className='name'>Tổng cộng</div>
                    <div className='content'>
                        <div className='price'>{formatPrice(totalPrice)}</div>
                        <span>VND</span>
                    </div>
                </div>
                <div className='wrap-button'>
                    <button className='button_1 button btn pt-2 pb-2'>Liên hệ tư vấn</button>
                    <button className={`button_2 button btn pt-2 pb-2 ${inCart ? 'btn-danger' : ''}`}
                            onClick={inCart ? handleRemoveFromCart : handleAddToCart}
                    > {inCart ? "Xóa khỏi giỏ hàng" : "Thêm vào giỏ hàng"}</button>
                </div>
            </div>
            <div className='bottom'>
                <div className='row'>
                    {tourServices && tourServices.length > 0 && tourServices.map(service => (
                        <div key={service.id} className='col-6 wrap'>
                            <Done className='icon'/>
                            <span>{service.nameService}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}