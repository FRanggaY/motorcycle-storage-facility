import { setTotalCustomer, setTotalItem, setTotalTransaction, setMonthlyDateCome, setDataGroupedItemBrand, setDataGroupedCustomer } from '../redux/slices/dashboardSlice';

const fetchDataTotal = async (dispatch, setData, endpoint, customParams = {}) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(customParams).filter(([key, value]) => value !== '')
    );

    const queryString = Object.keys(filteredParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key])}`)
      .join('&');

    const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/dashboard/${endpoint}`;
    const fullUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

    const response = await fetch(fullUrl);

    if (response.ok) {
      const data = await response.json();
      dispatch(setData(data.data.total));
    } else {
      console.error(`Failed to fetch total ${endpoint}:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error fetching total ${endpoint}:`, error);
  }
};

export const fetchDashboardTotalCustomer = async (dispatch) => {
  await fetchDataTotal(dispatch, setTotalCustomer, 'customers');
};

export const fetchDashboardTotalItem = async (dispatch, customParams = {}) => {
  await fetchDataTotal(dispatch, setTotalItem, 'items', customParams);
};

export const fetchDashboardTotalTransaction = async (dispatch, customParams = {}) => {
  await fetchDataTotal(dispatch, setTotalTransaction, 'transactions', customParams);
};

const fetchDataStat = async (dispatch, setData, endpoint, customParams = {}) => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(customParams).filter(([key, value]) => value !== '')
    );

    const queryString = Object.keys(filteredParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key])}`)
      .join('&');

    const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/dashboard/${endpoint}`;
    const fullUrl = queryString ? `${apiUrl}?${queryString}` : apiUrl;

    const response = await fetch(fullUrl);

    if (response.ok) {
      const data = await response.json();
      dispatch(setData(data.data));
    } else {
      console.error(`Failed to fetch stat ${endpoint}:`, response.statusText);
    }
  } catch (error) {
    console.error(`Error fetching stat ${endpoint}:`, error);
  }
};

export const fetchDashboardMonthlyDateCome = async (dispatch,  customParams = {}) => {
  await fetchDataStat(dispatch, setMonthlyDateCome, 'transactions/monthly-date-come', customParams);
};

export const fetchDashboardGroupedItemBrand = async (dispatch,  customParams = {}) => {
  await fetchDataStat(dispatch, setDataGroupedItemBrand, 'transactions/grouped-item-brand', customParams);
};

export const fetchDashboardGroupedCustomer = async (dispatch,  customParams = {}) => {
  await fetchDataStat(dispatch, setDataGroupedCustomer, 'transactions/grouped-customer', customParams);
};
