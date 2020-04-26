import { configureStore } from "@reduxjs/toolkit";
import dataFetcherReducer from "../features/dataFetcher/dataFetcherSlice";

export default configureStore({
    reducer: {
        data: dataFetcherReducer,
    },
});
