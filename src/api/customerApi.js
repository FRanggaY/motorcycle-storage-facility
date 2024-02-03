import { setCustomers, setTotalPages } from '../redux/slices/customerSlice';

export const fetchCustomers = async (dispatch, customParams = {}) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(customParams).filter(([key, value]) => value !== '')
    );

    const queryString = Object.keys(filteredParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key])}`)
      .join('&');

    const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer`;
    const fullUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

    const response = await fetch(fullUrl);

    if (response.ok) {
      const data = await response.json();
      dispatch(setCustomers(data.data));
      dispatch(setTotalPages(data.meta.total_pages));
    } else {
      console.error(`Failed to fetch customers:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error fetching customers:`, error);
  }
};
