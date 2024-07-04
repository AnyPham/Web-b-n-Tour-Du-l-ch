// thêm cart tour vào localstorage
import {now} from "./utill";

export const addCartTourToLocal = (cart) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    // Lấy dữ liệu từ localStorage (nếu có) và chuyển đổi từ chuỗi JSON thành mảng
    const id = cart.id === undefined ? cart.idCard : cart.id;
    const quantityAdult = cart.quantityAdult === undefined ? 1 : cart.quantityAdult;
    const quantityChild = cart.quantityChild === undefined ? 0 : cart.quantityChild;
    const tour = cart.tour === undefined ? cart :cart.tour
    const updatedItems = [...storedItems, {
        id: id,
        tour: tour,
        quantityAdult: quantityAdult,
        quantityChild: quantityChild,
        total_price: cart.price,
        status: "Chưa thanh toán"
    }];

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
}
// xóa cart tour khỏi localstorage
export const removeCartTourFromLocal = (id) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Lọc ra các mặt hàng khác với mặt hàng có idCard tương ứng
    const updatedItems = storedItems.filter((item) => item.id !== id);

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
}
// cập nhật cart tour trong localstorage

export const updateCartTourInLocal = (id, quantityAdult, quantityChild, total_price) => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedItems = storedItems.map((item) => {
        if (item.id === id) {
            const updatedQuantityAdult = isNaN(quantityAdult) || quantityAdult === null ? 1 : quantityAdult;
            const updatedQuantityChild = isNaN(quantityChild) || quantityChild === null ? 0 : quantityChild;
            return {
                ...item,
                quantityAdult: updatedQuantityAdult,
                quantityChild: updatedQuantityChild,
                total_price: total_price
            };
        }
        return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedItems));
};

// thêm tour vào localstorage
export const addTourToLocal = (tour) => {
     const storedItems = JSON.parse(localStorage.getItem("viewedTours")) || [];

  // Kiểm tra xem tour đã tồn tại trong storedItems hay chưa
  const tourExists = storedItems.some((item) => item.id === tour.id);

  if (!tourExists) {
    const updatedItems = [
      ...storedItems,
      {
        id: tour.id,
        name: tour.name,
        image: tour.image,
        price: tour.price_adult
      }
    ];

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("viewedTours", JSON.stringify(updatedItems));
  }
}
// xóa cart tour khỏi localstorage
export const removeTourFromLocal = (id) => {
    const storedItems = JSON.parse(localStorage.getItem("viewedTours")) || [];

    // Lọc ra các mặt hàng khác với mặt hàng có idCard tương ứng
    const updatedItems = storedItems.filter((item) => item.id !== id);

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("viewedTours", JSON.stringify(updatedItems));
}

export const getToursFromLocal = () => {
  const viewedTours = JSON.parse(localStorage.getItem("viewedTours")) || [];
  const firstThreeTours = viewedTours.slice(0, 3);
  return firstThreeTours;
};
export const addCheckoutToLocal = (checkout) => {
    const storedItems = JSON.parse(localStorage.getItem("checkout")) || [];
    // Lấy dữ liệu từ localStorage (nếu có) và chuyển đổi từ chuỗi JSON thành mảng

    const updatedItems = [...storedItems, {
        id: checkout.id,
        user_id: checkout.user_id,
        tour:checkout.tour,
        quantityAdult: checkout.quantityAdult,
        quantityChild: checkout.quantityChild,
        total_price: checkout.total_price,
        payment_method: checkout.payment_method,
        status: checkout.status,
        date: now()
        // passenger_details: checkout.passenger_details
    }];

    // Lưu mảng dữ liệu mới vào localStorage
    localStorage.setItem("checkout", JSON.stringify(updatedItems));
}
