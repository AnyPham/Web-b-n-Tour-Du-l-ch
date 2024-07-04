import {formatPrice} from "../utils/utill";
import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Service from "../components/Service";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import CommentForm from "../components/CommentForm";

export const BookTour = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    let storedItems = JSON.parse(localStorage.getItem("checkout")) || [];
    storedItems = storedItems.filter((item) => item.user_id === user.id);
    useEffect(() => {
        const isAuthenticated = user; // Kiểm tra trạng thái đăng nhập
        if (!isAuthenticated) {
            Swal.fire({
                title: "Thông báo",
                text: "Vui lòng đăng nhập trước khi xem trang này",
                icon: "warning",
                confirmButtonText: "OK",
            });
            navigate('/login'); // Chuyển hướng nếu không đăng nhập
            return;
        }
    }, []);
    return (<>
        <Navbar/>
        <div className="container">
            <div className="row pt-4"><Service/></div>
        </div>
        <div className="bg-white">
            <div className="container">
                <div className="p-4 mt-4 rounded" id="booked">
                    <h3 className=" title">Tour đã xác nhận</h3>
                    <div className="hr-light"></div>
                    <div
                        className={`overflow-auto overflow-cart scrollbar ${storedItems.length > 0 ? '' : 'd-flex justify-content-center align-items-center'}`}>
                        {storedItems.length > 0 ? storedItems.map((item) => (<>
                                <div className="m-2 p-2 items rounded mr-1" key={item.id}>
                                    <Link to={`/tourList/${item.tour.idCard}`}>
                                    <span className="font-weight-bold d-block title">{item.tour.title}</span>
                                    </Link>
                                    <div className="d-flex justify-content-between flex-wrap ">
                                        <div className="d-flex flex-row flex-1">
                                            <Link to={`/tourList/${item.tour.idCard}`}>
                                            <img className="rounded image-tour-cart mt-1" src={item.tour.image}
                                                 alt={item.tour.title}/>
                                            </Link>
                                            <div className="ml-2">
                                                <ul className="ml-1">
                                                    <li>
                                          <span className="spec text-center">
                                            <i className="fas fa-barcode item-icon"></i>Mã tour: {item.tour.idCard}
                                          </span>
                                                    </li>
                                                    <li>
                                            <span className="spec text-center">
                                            <i className="far fa-clock item-icon"></i>Thời gian: {item.tour.time}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec text-center">
                                            <i className="far fa-calendar-alt item-icon"></i>Ngày khởi hành: {item.tour.date}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec">
                                            <i className="fas fa-plane-departure item-icon"></i>Phương tiện: {item.tour.plane}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec">
                                            <i className="fas fa-star item-icon"></i>Chất lượng: {item.tour.start}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec text-center">
                                            <i className="fas fa-user item-icon"></i>Số người lớn: {item.quantityAdult}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec text-center">
                                            <i className="fas fa-child item-icon "></i>Số trẻ em: {item.quantityChild}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec text-center">
                                            <i className="fas fa-money-check item-icon"></i>Hình thức: {item.payment_method}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec text-center">

                                            <i className="fas fa-calendar-check item-icon"></i>{item.status === "Đã thanh toán" ? "Ngày thanh toán" : "Ngày xác nhận thanh toán"}: {item.date}
                                          </span>
                                                    </li>
                                                    <li>
                                          <span className="spec text-center">
                                              <i className="fas fa-money-check-alt item-icon"></i>Tổng tiền: <span
                                              className="font-weight-bold text-warning">{formatPrice(item.total_price)}</span>đ
                                          </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mr-2">
                                            <span
                                                className="font-weight-bold text-warning">{item.status === "Đã thanh toán" ? "Đã thanh toán" : "Chờ thanh toán..."}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <CommentForm 
                                            idTour={item.tour.idCard}
                                            commenter={user.fullname}
                                        />
                                    </div>
                                </div>
                            </>)
                        ) : <h5 className="d-flex justify-content-center align-items-center"><i>Chưa có tour nào được
                            xác nhận thanh toán!</i></h5>}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>)

}