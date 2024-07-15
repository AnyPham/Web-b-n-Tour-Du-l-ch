import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
        }
    }
});

const {loginSuccess} = authSlice.actions;

export const login = ({email, password}) => async dispatch => {
    const result = await axios.post('', {
        email, password
    });
    dispatch(loginSuccess(result.data));
}

export default authSlice.reducer;