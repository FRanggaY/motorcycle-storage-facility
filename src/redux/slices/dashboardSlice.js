import { createSlice } from "@reduxjs/toolkit"

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        total_customer: 0,
        total_item: 0,
        total_transaction: 0,
        dataMonthlyDateCome: [],
        dataGroupedItemBrand: [],
        dataGroupedCustomer: [],
    },
    reducers: {
        setMonthlyDateCome: (state, action) => {
            state.dataMonthlyDateCome = action.payload;
        },
        setDataGroupedItemBrand: (state, action) => {
            state.dataGroupedItemBrand = action.payload;
        },
        setDataGroupedCustomer: (state, action) => {
            state.dataGroupedCustomer = action.payload;
        },
        setTotalCustomer: (state, action) => {
            state.total_customer = action.payload;
        },
        setTotalItem: (state, action) => {
            state.total_item = action.payload;
        },
        setTotalTransaction: (state, action) => {
            state.total_transaction = action.payload;
        },
    }
})

export const { setMonthlyDateCome, setDataGroupedItemBrand, setDataGroupedCustomer, setTotalCustomer, setTotalItem, setTotalTransaction } = dashboardSlice.actions;
export default dashboardSlice.reducer;
