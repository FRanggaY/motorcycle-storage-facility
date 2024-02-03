import { createSlice } from "@reduxjs/toolkit"

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        itemsPerPage: 10,
        currentPage: 1,
        totalPages: 1,
        data: [],
        detail: {},
        transactionStatus: [
          {
            "id": "reserved"
          },
          {
            "id": "taken"
          },
        ]
    },
    reducers: {
        // addToTransaction: (state, action) => {
        //     state.data.push(action.payload);
        // },
        setTransactions: (state, action) => {
          state.data = action.payload;
        },
        setTransaction: (state, action) => {
          state.detail = action.payload;
        },
        // editTransaction: (state, action) => {
        //     const editedTransactionIndex = state.data.findIndex(transaction => transaction.id === action.payload.id);
        //     if (editedTransactionIndex !== -1) {
        //       state.data[editedTransactionIndex] = action.payload;
        //     }
        //   },
        deleteTransaction: (state, action) => {
          state.data = state.data.filter(transaction => transaction.id !== action.payload);
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

export const { deleteTransaction, setTransactions, setCurrentPage, setTotalPages, setItemsPerPage, setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
