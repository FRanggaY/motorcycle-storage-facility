import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/itemSlice';
import { fetchItemsPaginate } from '../../api/itemApi';

export const TableItem = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.data);
  const currentPage = useSelector((state) => state.item.currentPage);
  const itemsPerPage = useSelector((state) => state.item.itemsPerPage);
  const totalPages = useSelector((state) => state.item.totalPages);

  useEffect(() => {
    fetchItemsPaginate(dispatch, currentPage, itemsPerPage);
  }, [currentPage, dispatch, itemsPerPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 &&
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.brand}</td>
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
