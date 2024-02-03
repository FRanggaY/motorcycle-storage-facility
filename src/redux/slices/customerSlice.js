import { createSlice } from "@reduxjs/toolkit"

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        itemsPerPage: 10,
        currentPage: 1,
        totalPages: 1,
        data: []
    },
    reducers: {
        // addToCustomer: (state, action) => {
        //     state.data.push(action.payload);
        // },
        setCustomers: (state, action) => {
            state.data = action.payload;
        },
        // editCustomer: (state, action) => {
        //     const editedCustomerIndex = state.data.findIndex(Customer => Customer.id === action.payload.id);
        //     if (editedCustomerIndex !== -1) {
        //       state.data[editedCustomerIndex] = action.payload;
        //     }
        //   },
        deleteCustomer: (state, action) => {
            state.data = state.data.filter(customer => customer.id !== action.payload);
        },
        setCurrentPage: (state, action) => {
          state.currentPage = action.payload;
        },
        setTotalPages: (state, action) => {
          state.totalPages = action.payload;
        },
        setItemsPerPage: (state, action) => {
          state.itemsPerPage = action.payload;
        },
    }
})

export const { deleteCustomer, setCustomers, setCurrentPage, setTotalPages, setItemsPerPage } = customerSlice.actions;
export default customerSlice.reducer;
