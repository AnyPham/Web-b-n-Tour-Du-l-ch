import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Cart} from "./pages/Cart";
import Category from "./pages/Category";
import {Checkout} from "./pages/Checkout";
import Home from "./pages/Home";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Tour from "./pages/Tour";
import {addCart} from "./redux/slices/CartsSlice";
import {fetchTours} from "./redux/slices/TourSlice";
import {BookTour} from "./pages/BookTour";
import {Booking} from "./pages/Booking";
import {Payment} from "./pages/Payment";
import {Account} from "./pages/Account";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Đồng bộ dữ liệu vào Redux
        storedItems.forEach((item) => {
            dispatch(addCart(item));
        });
    }, []);

    // load dữ liệu tour từ server
    useEffect(() => {
        dispatch(fetchTours());
    }, [dispatch]);



    return (
        <Router>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="/tourList" element={<Tour/>}/>
                <Route path="/tourList/:tourId" element={<Tour/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/booking" element={<Booking/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/booked" element={<BookTour/>}/>
                <Route path="/tour" element={<Tour/>}/>
                <Route path="/category" element={<Category/>}/>
                <Route path="/category/:key" element={<Category/>}/>
                <Route path="/account" element={<Account/>}/>

            </Routes>
        </Router>
    );
}

export default App;
