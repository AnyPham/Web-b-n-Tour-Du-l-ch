import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        key: "",
        starting: "",
        destination: "",
        date:"",
        areaHot:""
    },
    reducers: {
        keyFilterChange: (state, action) => {
            state.key = action.payload
        },
        searchChange: (state, action) => {
            state.starting = action.payload.starting
            state.destination = action.payload.destination
            state.date = action.payload.date
            state.areaHot = ""
        },
        areaHot: (state, action) => {
            if (state.areaHot !== action.payload) {
                state.areaHot = action.payload
                state.key = ""
                state.starting = ""
                state.destination = ""
                state.date = ""
            }
        }
    }
})

// export hàm ra ngoài
export const { keyFilterChange, searchChange, areaHot } = filterSlice.actions
export default filterSlice.reducer;