import { setCustomers, setTotalPages } from '../redux/slices/customerSlice';

export const fetchCustomersPaginate = async (dispatch, currentPage, itemsPerPage) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer?size=${itemsPerPage}&offset=${currentPage}`
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setCustomers(data.data));
      dispatch(setTotalPages(data.meta.total_pages));
    } else {
      console.error('Failed to fetch customers:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};
