import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/FiltersSlice";
import cartReducer from "./slices/CartsSlice";
import selectedTourReducer from "./slices/SelectedTourSlice";
import tourReducer from "./slices/TourSlice"
import arrangementReducer from "./slices/ArrangementSlice";
import checkoutReducer from "./slices/CheckoutSlice"
import commentReducer from "./slices/CommentSlice"
import subComentReducer from "./slices/SubCommentSlice"

const store = configureStore({
    reducer: {
        selectedTour: selectedTourReducer,
        filters: filtersReducer,
        carts: cartReducer,
        tours: tourReducer,
        arrangement: arrangementReducer,
        checkout: checkoutReducer,
        comments: commentReducer,
        subComments: subComentReducer
    }
})

export default store;