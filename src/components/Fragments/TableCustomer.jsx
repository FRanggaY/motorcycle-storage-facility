import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/customerSlice';
import { fetchCustomers } from '../../api/customerApi';

export const TableCustomer= ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.data);
  const currentPage = useSelector((state) => state.customer.currentPage);
  const itemsPerPage = useSelector((state) => state.customer.itemsPerPage);
  const totalPages = useSelector((state) => state.customer.totalPages);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  useEffect(() => {
    fetchCustomers(dispatch, customParams);
  }, [currentPage, dispatch, itemsPerPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>No HP</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 &&
            customers.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.no_hp}</td>
                <td>
                  <button onClick={() => onEdit(item)}>Edit</button>
                  <button onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
