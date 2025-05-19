import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    results: [],
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchResult: (state, action) => {
            state.results = action.payload;
        },
    }
})

export const {searchResult} = searchSlice.actions;
export default searchSlice.reducer;