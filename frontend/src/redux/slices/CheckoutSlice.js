import {createSlice} from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: [],
    reducers: {
        saveInfoPassenger: (state, action) => {
            const newCheckout = {
                id: action.payload.id,
                user_id: action.payload.user_id,
                tour: action.payload.tour,
                quantityAdult: action.payload.quantityAdult,
                quantityChild: action.payload.quantityChild,
                total_price: action.payload.total_price,
                payment_method: action.payload.payment_method,
                status: "pending",
                passenger_details: action.payload.passenger_details
            }
            state.push(newCheckout)
        },
        updatePayment: (state, action) => {
            return state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        payment_method: action.payload.payment_method
                    }
                }
                return item;
            })
        },
        updateStatusPayment: (state, action) => {
            const updatedState = state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        status: action.payload.status
                    };
                }
                return item;
            });

            return updatedState;
        },
        removeCheckout:(state,action)=>{
            const id = action.payload;
            return state.filter((item) => item.id !== id);
        }
    },
})
export const {saveInfoPassenger, updatePayment,updateStatusPayment,removeCheckout} = checkoutSlice.actions;
export default checkoutSlice.reducer;