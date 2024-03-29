import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/itemSlice";
import customerReducer from "./slices/customerSlice";
import transactionReducer from "./slices/transactionSlice";
import dashboardReducer from "./slices/dashboardSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
    reducer: { 
      item: itemReducer,
      customer: customerReducer,
      transaction: transactionReducer,
      dashboard: dashboardReducer,
      theme: themeReducer
    },
});
// console.log("store change: ", store.getState());

// store.subscribe(() => {
//     console.log("store change: ", store.getState());
// });

export default store;
