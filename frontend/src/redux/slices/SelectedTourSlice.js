import {createSlice} from "@reduxjs/toolkit";

const selectedTourSlice = createSlice({
    name: "selectedTour",
    initialState: null,
    reducers: {
        setSelectedTour: (state, action) => {
            return action.payload;
        },
        clearSelectedTour: (state) => null,
        updateSelectedTour: (state, action) => {
            const {quantityAdult, quantityChild, total_price} = action.payload;
            if (state === null)
                return;
            // Nếu selectedTour đã tồn tại, cập nhật các giá trị mới
            return {
                ...state,
                quantityAdult: quantityAdult,
                // quantityChild: quantityChild,
                total_price: total_price,
            };
        }

    },
});

export const {setSelectedTour, clearSelectedTour,updateSelectedTour} = selectedTourSlice.actions;
export default selectedTourSlice.reducer;
