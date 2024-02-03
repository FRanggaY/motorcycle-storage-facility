import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, setItemsPerPage } from '../redux/slices/itemSlice';
import { TableItem } from '../components/Fragments/TableItem';
import { fetchItems } from '../api/itemApi';

function ItemPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ brand: '', title: '' });
  const [editItemId, setEditItemId] = useState(null);
  const currentPage = useSelector((state) => state.item.currentPage);
  const itemsPerPage = useSelector((state) => state.item.itemsPerPage);

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

  async function updateItem(){
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item/${editItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchItems(dispatch, customParams);
        setEditItemId(null);
      } else {
        console.error('Failed to edit item:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  }

  async function createItem(){
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchItems(dispatch, customParams);
      } else {
        console.error('Failed to create item:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editItemId) {
      updateItem()
    } else {
      createItem()
    }

    // clear data
    setFormData({ brand: '', title: '' });
  };

  const handleEdit = (item) => {
    setFormData({ brand: item.brand, title: item.title });
    setEditItemId(item.id);
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteItem(itemId));
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h1>Item Page showed {itemsPerPage} data in page {currentPage}</h1>
      <TableItem onEdit={handleEdit} onDelete={handleDelete} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand" />
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
        <button type="submit">{editItemId ? 'Edit' : 'Submit'}</button>
      </form>

      <select name="itemPerPageSelect" onChange={handleChangeItemPerPageSelect} value={itemsPerPage}>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
  );
}
export default ItemPage;
