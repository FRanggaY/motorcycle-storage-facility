import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, setItemsPerPage } from '../redux/slices/customerSlice';
import { TableCustomer } from '../components/Fragments/TableCustomer';
import { fetchCustomers } from '../api/customerApi';

function CustomerPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', no_hp: '' });
  const [editCustomerId, setEditCustomerId] = useState(null);
  const currentPage = useSelector((state) => state.customer.currentPage);
  const itemsPerPage = useSelector((state) => state.customer.itemsPerPage);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleChangeItemPerPageSelect = (e) => {
    dispatch(setItemsPerPage(e.target.value));
  };

  async function updateCustomer(){
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer/${editCustomerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCustomers(dispatch, customParams);
        setEditCustomerId(null);
      } else {
        console.error('Failed to edit customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing customer:', error);
    }
  }

  async function createCustomer(){
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCustomers(dispatch, customParams);
      } else {
        console.error('Failed to create customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editCustomerId) {
      updateCustomer()
    } else {
      createCustomer()
    }

    // clear data
    setFormData({ name: '', no_hp: '' });
  };

  const handleEdit = (customer) => {
    setFormData({ name: customer.name, no_hp: customer.no_hp });
    setEditCustomerId(customer.id);
  };

  const handleDelete = async (CustomerId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer/${CustomerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteCustomer(CustomerId));
      } else {
        console.error('Failed to delete customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      <h1>Customer Page showed {itemsPerPage} data in page {currentPage}</h1>
      <TableCustomer onEdit={handleEdit} onDelete={handleDelete} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
        <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} placeholder="Enter no_hp" />
        <button type="submit">{editCustomerId ? 'Edit' : 'Submit'}</button>
      </form>

      <select name="CustomerPerPageSelect" onChange={handleChangeItemPerPageSelect} value={itemsPerPage}>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
export default CustomerPage;
