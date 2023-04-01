import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        verify: false,
    },
    reducers: {
        setVerifyModal: (state, action) => {
            state.verify = action.payload
        }

    }
})

export const { setVerifyModal } = modalSlice.actions;

export default modalSlice.reducer;