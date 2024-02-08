import { createSlice } from "@reduxjs/toolkit"

const itemSlice = createSlice({
  name: "item",
  initialState: {
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
    data: []
  },
  reducers: {
    // addToItem: (state, action) => {
    //     state.data.push(action.payload);
    // },
    setItems: (state, action) => {
      state.data = action.payload;
    },
    // editItem: (state, action) => {
    //     const editedItemIndex = state.data.findIndex(item => item.id === action.payload.id);
    //     if (editedItemIndex !== -1) {
    //       state.data[editedItemIndex] = action.payload;
    //     }
    //   },
    deleteItem: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
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

export const { deleteItem, setItems, setCurrentPage, setTotalPages, setItemsPerPage } = itemSlice.actions;
export default itemSlice.reducer;
