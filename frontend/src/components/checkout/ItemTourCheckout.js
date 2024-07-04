import React from "react";
import {formatPrice} from "../../utils/utill";
import {Link} from "react-router-dom";

export const ItemTourCheckout = (prop) => {
    return (
        <>
                <a className="btn support-switchboard p-3 pr-4 pl-4 btn-block rounded" href="tel:0355 422 160">
                    <span>Hỗ trợ giao dịch: <b>0355 422 160</b></span>
                </a>
            <div className="mt-3">
                <div className="card" style={{width: "100%"}}>
                    <Link to={`/tourList/${prop.selectedTour.tour.idCard}`}>
                    <img className="card-img-top" style={{minHeight: "200px"}}
                         src={prop.selectedTour.tour.image}
                         alt={prop.selectedTour.tour.title}/>
                    </Link>
                    <div className="card-body">
                        <h4>{prop.selectedTour.tour.title}</h4>
                        <div className="ml-2">
                            <ul style={{whiteSpace: "nowrap"}} className="ml-1">
                                <li>
                          <span className="spec text-center">
                            <i className="fas fa-barcode item-icon-fas"></i>Mã tour: {prop.selectedTour.tour.idCard}
                          </span>
                                </li> <li>
                          <span className="spec text-center">
                            <i className="far fa-clock item-icon-fas"></i>Thời gian: {prop.selectedTour.tour.time}
                          </span>
                                </li>
                                <li>
                          <span className="spec text-center">
                            <i className="far fa-calendar-alt item-icon-fas"></i>Ngày khởi hành: {prop.selectedTour.tour.date}
                          </span>
                                </li>
                                <li>
                          <span className="spec">
                            <i className="fas fa-plane-departure item-icon-fas"></i>Phương tiện: {prop.selectedTour.tour.plane}
                          </span>
                                </li>
                                <li>
                          <span className="spec">
                            <i className="fas fa-star item-icon-fas"></i>Chất lượng: {prop.selectedTour.tour.start}
                          </span>
                                </li>
                                <li>
                          <span className="spec">
                            <i className="fas fa-users item-icon-fas"></i>Số hành khách tối đa: {prop.selectedTour.tour.quantity}
                          </span>
                                </li>
                                <li>
                          <span className="spec text-center">
                            <i className="fas fa-user item-icon-fas"></i>Số người lớn: {prop.selectedTour.quantityAdult}
                          </span>
                                </li>
                                <li>
                          <span className="spec text-center">
                            <i className="fas fa-child item-icon-fas "></i>Số trẻ em: {prop.selectedTour.quantityChild}
                          </span>
                                </li>
                            </ul>
                        </div>
                        <div className="priceTotal">
                            <h4>Tổng: <span id="total-price" className="amber-text">{formatPrice(prop.selectedTour.total_price)}</span><small>đ</small></h4>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )

}