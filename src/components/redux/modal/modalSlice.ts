import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        verify: false,
        changePassword: false,
        cancelOrder: false,
    },
    reducers: {
        setVerifyModal: (state, action) => {
            state.verify = action.payload
        },
        setChangePasswordModal: (state, action) => {
            state.changePassword = action.payload;
        },
    }
})

export const { setVerifyModal, setChangePasswordModal } = modalSlice.actions;

export default modalSlice.reducer;