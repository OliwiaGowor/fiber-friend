import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        code: 0,
        message: "",
        customMessage: "",
    },
    reducers: {
        setError: (state, action) => {
            state.code = action.payload.code;
            state.message = action.payload.message;
            state.customMessage = action.payload.customMessage;
        },
        clearError: (state) => {
            state.code = 0;
            state.message = "";
            state.customMessage = "";
        },
    },
})

export const { setError, clearError } = errorSlice.actions;
export const errorSelector = (state: RootState) => state.error;
export default errorSlice.reducer;