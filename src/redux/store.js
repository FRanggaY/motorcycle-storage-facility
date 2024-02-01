import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";

const store = configureStore({
    reducer: { item: itemReducer },
});
console.log("store change: ", store.getState());

store.subscribe(() => {
    console.log("store change: ", store.getState());
});

export default store;