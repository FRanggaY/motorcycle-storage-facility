import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/transactionSlice';
import { fetchTransactions } from '../../api/transactionApi';

export const TableTransaction = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.data);
  const currentPage = useSelector((state) => state.transaction.currentPage);
  const itemsPerPage = useSelector((state) => state.transaction.itemsPerPage);
  const totalPages = useSelector((state) => state.transaction.totalPages);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  useEffect(() => {
    fetchTransactions(dispatch, customParams);
  }, [currentPage, dispatch, itemsPerPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Item Title</th>
            <th>Date come</th>
            <th>Date out</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((item) => (
              <tr key={item.id}>
                <td>{item.customer.name}</td>
                <td>{item.item.title}</td>
                <td>{item.date_come}</td>
                <td>{item.date_out}</td>
                <td>{item.cost_final}</td>
                <td>{item.status}</td>
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
