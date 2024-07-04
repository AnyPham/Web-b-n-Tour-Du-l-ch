import {ShoppingCart} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import '../styles/cart.scss'
export const IconCart = () => {
    const cartItems = useSelector((state) => state.carts);
    const [cartItemsCount, setCartItemsCount] = useState(cartItems.length);
    useEffect(() => {
        setCartItemsCount(cartItems.length);
    }, [cartItems]); // Gọi useEffect khi cartItems thay đổi

    return (
    <>
      <span className="icon-cart">
        <ShoppingCart />
      </span>
      <span className="badge rounded-pill badge-notification bg-danger position-absolute">{cartItemsCount}</span>
    </>
  );
};
