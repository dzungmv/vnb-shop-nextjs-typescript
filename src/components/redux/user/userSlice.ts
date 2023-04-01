import { createSlice } from "@reduxjs/toolkit";

import { UserTypes } from "@/components/types";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as UserTypes

    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setVerified: (state, action) => {
            state.user.user.verified = action.payload
        },
        logout: (state) => {
            state.user = {} as UserTypes
        }
    }
})

export const { setUser, setVerified, logout } = userSlice.actions;
export default userSlice.reducer;