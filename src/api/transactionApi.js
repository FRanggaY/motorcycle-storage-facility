import { setTransactions, setTransaction, setTotalPages } from '../redux/slices/transactionSlice';

export const fetchTransactions = async (dispatch, customParams = {}) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(customParams).filter(([key, value]) => value !== '')
    );

    const queryString = Object.keys(filteredParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key])}`)
      .join('&');

    const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction`;
    const fullUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

    const response = await fetch(fullUrl);

    if (response.ok) {
      const data = await response.json();
      dispatch(setTransactions(data.data));
      dispatch(setTotalPages(data.meta.total_pages));
    } else {
      console.error(`Failed to fetch transactions:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error fetching transactions:`, error);
  }
};

export const fetchTransaction = async (id) => {
  try {
    const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction/${id}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error(`Failed to fetch transaction:`, response.statusText);
      return;
    }
  } catch (error) {
    console.error(`Error fetching transaction:`, error);
  }
};
