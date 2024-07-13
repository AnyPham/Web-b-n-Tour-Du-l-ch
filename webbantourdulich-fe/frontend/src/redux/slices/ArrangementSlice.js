import { createSlice } from "@reduxjs/toolkit";

const arrangementSlice = createSlice({
    name: 'arrangement',
    initialState: {
        arrangement:"duration"
    },
    reducers: {
        arrangementChange: (state, action) => {
            state.arrangement = action.payload
        },
    }
})

// export hàm ra ngoài
export const { arrangementChange } = arrangementSlice.actions
export default arrangementSlice.reducer;