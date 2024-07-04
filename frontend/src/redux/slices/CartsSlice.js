import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "carts",
    initialState: [],
    reducers: {
        addCart: (state, action) => {
            // bao gồm trường hợp đồng bộ dữ liệu từ localStorage và lúc add tour vào giỏ
                const id = action.payload.id === undefined ? action.payload.idCard : action.payload.id;
                const tour = action.payload.tour === undefined ? action.payload : action.payload.tour;
                const quantityAdult = action.payload.quantityAdult === undefined ? 1 : action.payload.quantityAdult;
                const quantityChild = action.payload.quantityChild === undefined ? 0 : action.payload.quantityChild;
                const total_price = action.payload.total_price === undefined ? action.payload.priceAdult : action.payload.total_price;
                const newCartItem = {
                    id: id, // Gán giá trị id từ payload
                    tour: tour,
                    quantityAdult: quantityAdult,
                    quantityChild: quantityChild,
                    total_price: total_price,
                    status: "Chưa thanh toán"
                };
                state.push(newCartItem);
        },
        removeCart: (state, action) => {
            const itemId = action.payload;
            return state.filter((item) => item.id !== itemId);
        },
        updateCart: (state, action) => {
            const {idCard, quantityAdult, quantityChild, total_price} = action.payload;
            return state.map((item) => {
                if (item.id === idCard) {
                    // Kiểm tra giá trị NaN trước khi cập nhật
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
        },

    },
});

export const {addCart, removeCart, updateCart} = cartSlice.actions;
export default cartSlice.reducer;
