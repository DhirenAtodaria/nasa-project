import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJsonData = createAsyncThunk(
    "data/fetchJsonData",
    async (thunkAPI) => {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );
        return response.data;
    }
);

export const dataFetcherSlice = createSlice({
    name: "dataFetcher",
    initialState: {
        posts: [],
    },
    extraReducers: {
        [fetchJsonData.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
    },
});

export default dataFetcherSlice.reducer;
