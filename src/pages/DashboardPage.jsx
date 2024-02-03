import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardGroupedCustomer, fetchDashboardGroupedItemBrand, fetchDashboardMonthlyDateCome, fetchDashboardTotalCustomer, fetchDashboardTotalItem, fetchDashboardTotalTransaction } from '../api/dashboardApi';
import { fetchItems } from '../api/itemApi';
import { fetchCustomers } from '../api/customerApi';
import { fetchDataIfNeeded } from '../utils/fetchData';

function DashboardPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ 
    year: '',
    brand: '',
    item_id: '',
    customer_id: '',
    date_come: '',
    transaction_status: '',
  });
  const totalCustomer = useSelector((state) => state.dashboard.total_customer);
  const totalItem = useSelector((state) => state.dashboard.total_item);
  const totalTransaction = useSelector((state) => state.dashboard.total_transaction);
  const dataGroupedCustomer = useSelector((state) => state.dashboard.dataGroupedCustomer);
  const dataGroupedItemBrand = useSelector((state) => state.dashboard.dataGroupedItemBrand);
  const dataMonthlyDateCome = useSelector((state) => state.dashboard.dataMonthlyDateCome);
  const dataItem = useSelector((state) => state.item.data);
  const dataCustomer = useSelector((state) => state.customer.data);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    fetchItems(dispatch);
    fetchCustomers(dispatch);
    fetchDashboardTotalCustomer(dispatch);
    fetchDashboardTotalItem(dispatch);
    fetchDashboardTotalTransaction(dispatch);
    fetchDashboardGroupedCustomer(dispatch);
    fetchDashboardGroupedItemBrand(dispatch);
    fetchDashboardMonthlyDateCome(dispatch);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customParamsTotalItem = {
      brand: formData.brand,
    };
    
    const customParamsTotalTransaction = {
      item_id: formData.item_id,
      customer_id: formData.customer_id,
      date_come: formData.date_come,
      transaction_status: formData.transaction_status,
    };

    const customParamsMonthlyDateCome = {
      year: formData.year,
      item_id: formData.item_id,
      customer_id: formData.customer_id,
      transaction_status: formData.transaction_status,
    };
    
    const customParamsGroupedItemBrand = {
      year: formData.year,
      customer_id: formData.customer_id,
      transaction_status: formData.transaction_status,
    };
    
    const customParamsGroupedCustomer = {
      year: formData.year,
      item_id: formData.item_id,
      transaction_status: formData.transaction_status,
    };

    await fetchDataIfNeeded(dispatch, fetchDashboardTotalItem, formData, customParamsTotalItem);
    await fetchDataIfNeeded(dispatch, fetchDashboardTotalTransaction, formData, customParamsTotalTransaction);
    await fetchDataIfNeeded(dispatch, fetchDashboardMonthlyDateCome, formData, customParamsMonthlyDateCome);
    await fetchDataIfNeeded(dispatch, fetchDashboardGroupedItemBrand, formData, customParamsGroupedItemBrand);
    await fetchDataIfNeeded(dispatch, fetchDashboardGroupedCustomer, formData, customParamsGroupedCustomer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Enter year" />
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand" />

        <select name="item_id" id="item_id" value={formData.item_id} onChange={handleChange}>
          <option value=""></option>
          {dataItem.length > 0 &&
            dataItem.map((data, i) => {
              return <option value={data.id} key={data.id}>
                {data.title}
              </option>
            })
          }
          <option value="1">beat</option>
        </select>
        
        <select name="customer_id" id="customer_id" value={formData.customer_id} onChange={handleChange}>
          <option value=""></option>
          {dataCustomer.length > 0 &&
            dataCustomer.map((data, i) => {
              return <option value={data.id} key={data.id}>
                {data.name}
              </option>
            })
          }
        </select>

        <input type="datetime-local" name="date_come" id="date_come" value={formData.date_come} onChange={handleChange} />

        <select name="transaction_status" id="transaction_status" value={formData.transaction_status} onChange={handleChange}>
          <option value=""></option>
          <option value="reserved">reserved</option>
          <option value="taken">taken</option>
        </select>

        <button type="submit">Find</button>
      </form>

      <div>
        <p>total customer : {totalCustomer}</p>
        <p>total item : {totalItem}</p>
        <p>total transaction : {totalTransaction}</p>
      </div>

      <div>
        <h4>Frequently Based Customer</h4>
        {dataGroupedCustomer.length > 0 &&
          dataGroupedCustomer.map((data, i) => {
            return <div key={data.name}>
              {data.name} with total {data.total}
            </div>
          })
        }
      </div>
      
      <div>
        <h4>Frequently Based Brand</h4>
        {dataGroupedItemBrand.length > 0 &&
          dataGroupedItemBrand.map((data, i) => {
            return <div key={data.brand}>
              {data.brand} with total {data.total}
            </div>
          })
        }
      </div>
      
      <div>
        <h4>Frequently Monthly DateCome</h4>
        {dataMonthlyDateCome.length > 0 &&
          dataMonthlyDateCome.map((data, i) => {
            return <div key={data.month}>
              {data.month} with total {data.total}
            </div>
          })
        }
      </div>

    </div>
  );
}
export default DashboardPage;
