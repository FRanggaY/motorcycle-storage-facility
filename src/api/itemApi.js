import { setItems, setTotalPages } from '../redux/slices/itemSlice';

export const fetchItemsPaginate = async (dispatch, currentPage, itemsPerPage) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item?size=${itemsPerPage}&offset=${currentPage}`
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setItems(data.data));
      dispatch(setTotalPages(data.meta.total_pages));
    } else {
      console.error('Failed to fetch items:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};
