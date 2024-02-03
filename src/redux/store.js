import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import customerReducer from "./slices/customerSlice";

const store = configureStore({
    reducer: { 
      item: itemReducer,
      customer: customerReducer
    },
});
console.log("store change: ", store.getState());

store.subscribe(() => {
    console.log("store change: ", store.getState());
});

export default store;
