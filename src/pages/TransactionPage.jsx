import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction, setItemsPerPage } from '../redux/slices/transactionSlice';
import { TableTransaction } from '../components/Fragments/TableTransaction';
import { fetchTransaction, fetchTransactions } from '../api/transactionApi';
import { fetchItems } from '../api/itemApi';
import { fetchCustomers } from '../api/customerApi';

function TransactionPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ 
    item_id : 0,
    customer_id : 0,
    date_come : '',
    date_out : '',
    cost_hourly : 0,
    cost_daily : 0,
    notes : '',
    plat_number : '',
    status : ''
   });
  const [editTransactionId, setEditTransactionId] = useState(null);
  const currentPage = useSelector((state) => state.transaction.currentPage);
  const itemsPerPage = useSelector((state) => state.transaction.itemsPerPage);
  const dataItem = useSelector((state) => state.item.data);
  const dataCustomer = useSelector((state) => state.customer.data);
  const transactionStatus = useSelector((state) => state.transaction.transactionStatus);

  useEffect(() => {
    fetchItems(dispatch);
    fetchCustomers(dispatch);
  }, [dispatch]);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleChangeDatetime = (e) => {
    let formattedValue = e.target.value.replace("T", " ");
  
    if (formattedValue.length === 16 && formattedValue.indexOf(":") === 13) {
      formattedValue += ":00";
    }
  
    setFormData({ ...formData, [e.target.name]: formattedValue });
  };
  
  const handleChangeItemPerPageSelect = (e) => {
    dispatch(setItemsPerPage(e.target.value));
  };

  async function updateTransaction(){
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction/${editTransactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTransactions(dispatch, customParams);
        setEditTransactionId(null);
      } else {
        console.error('Failed to edit transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing transaction:', error);
    }
  }

  async function createTransaction(){
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchTransactions(dispatch, customParams);
      } else {
        console.error('Failed to create transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTransactionId) {
      updateTransaction()
    } else {
      createTransaction()
    }

    // clear data
    setFormData({ 
      item_id : 0,
      customer_id : 0,
      date_come : '',
      date_out : '',
      cost_hourly : 0,
      cost_daily : 0,
      notes : '',
      plat_number : '',
      status : ''
    });
  };

  const handleEdit = async (data) => {
    const detail = await fetchTransaction(data.id);
    setFormData({ 
      item_id: detail.item.id,
      customer_id: detail.customer.id,
      date_come: detail.date_come,
      date_out: detail.date_out ? data.date_out : '',
      cost_hourly: detail.cost_hourly,
      cost_daily: detail.cost_daily,
      notes: detail.notes,
      plat_number: detail.plat_number,
      status: detail.status,
    });
    setEditTransactionId(data.id);
  };

  const handleDelete = async (TransactionId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction/${TransactionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteTransaction(TransactionId));
      } else {
        console.error('Failed to delete transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div>
      <h1>Transaction Page showed {itemsPerPage} data in page {currentPage}</h1>
      <TableTransaction onEdit={handleEdit} onDelete={handleDelete} />
      <form onSubmit={handleSubmit}>

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

        <select name="item_id" id="item_id" value={formData.item_id} onChange={handleChange}>
          <option value=""></option>
          {dataItem.length > 0 &&
            dataItem.map((data, i) => {
              return <option value={data.id} key={data.id}>
                {data.title}
              </option>
            })
          }
        </select>

        <input type="datetime-local" name="date_come" id="date_come" value={formData.date_come} onChange={handleChangeDatetime} />
        <input type="datetime-local" name="date_out" id="date_out" value={formData.date_out} onChange={handleChangeDatetime} />

        <input type="number" name="cost_hourly" id="cost_hourly" value={formData.cost_hourly} onChange={handleChange} placeholder="Cost Hourly" />
        <input type="number" name="cost_daily" id="cost_daily" value={formData.cost_daily} onChange={handleChange} placeholder="Cost Daily" />

        <textarea name="notes" id="notes" cols="30" rows="10" value={formData.notes} onChange={handleChange}></textarea>
        
        <input type="text" name="plat_number" value={formData.plat_number} onChange={handleChange} placeholder="Enter plat number" />

        <select name="status" id="status" value={formData.status} onChange={handleChange}>
          <option value=""></option>
          {transactionStatus.length > 0 &&
            transactionStatus.map((data, i) => {
              return <option value={data.id} key={data.id}>
                {data.id}
              </option>
            })
          }
        </select>

        <button type="submit">{editTransactionId ? 'Edit' : 'Submit'}</button>
      </form>

      <select name="TransactionPerPageSelect" onChange={handleChangeItemPerPageSelect} value={itemsPerPage}>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
export default TransactionPage;
