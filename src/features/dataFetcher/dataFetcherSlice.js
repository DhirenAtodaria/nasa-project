import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJsonData = createAsyncThunk(
    "data/fetchJsonData",
    async (thunkAPI) => {
        const response = await axios.get(
            "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0"
        );
        const data = response.data;
        delete data.sol_keys;
        delete data.validity_checks;
        let items = [];
        for (let key in data) {
            data[key]["SOL"] = key;
            const date = new Date(data[key].First_UTC);
            const newDate = `${date.getDate()} ${date.toLocaleString(
                "default",
                { month: "long" }
            )}`;
            data[key]["First_UTC"] = newDate;
            items.push(data[key]);
        }
        return items;
    }
);

export const dataFetcherSlice = createSlice({
    name: "dataFetcher",
    initialState: {
        apiData: [],
    },
    extraReducers: {
        [fetchJsonData.fulfilled]: (state, action) => {
            state.apiData = action.payload;
        },
    },
});

export default dataFetcherSlice.reducer;
