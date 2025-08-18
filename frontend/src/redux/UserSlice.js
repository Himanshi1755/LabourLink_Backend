import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(sessionStorage.getItem("user")) || null,
        token: sessionStorage.getItem("token") || null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.currentUser = null;
            state.token = null;
            sessionStorage.clear();
        },

    },
})

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
