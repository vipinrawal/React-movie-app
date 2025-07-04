import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,
};

export const seasonSlice = createSlice({
    name: "season",
    initialState,
    reducers: {
        loadseason:(state, action) => {
            state.info = action.payload;
        },
        removeseason:(state, action) => {
            state.info = null;
        }
    },
});

export const {loadseason, removeseason} = seasonSlice.actions;

export default seasonSlice.reducer;
