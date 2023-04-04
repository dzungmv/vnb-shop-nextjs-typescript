import { createSlice } from "@reduxjs/toolkit";

import { CartType, UserTypes } from "@/components/types";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {} as UserTypes,
        cart: [] as CartType[],

    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setVerified: (state, action) => {
            state.user.user.verified = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        logout: (state) => {
            state.user = {} as UserTypes
        }
    }
})

export const { setUser, setVerified, setCart, logout } = userSlice.actions;
export default userSlice.reducer;