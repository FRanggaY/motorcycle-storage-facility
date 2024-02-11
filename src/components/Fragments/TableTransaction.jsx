import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setItemsPerPage } from '../../redux/slices/transactionSlice';
import { fetchTransactions } from '../../api/transactionApi';
import { Button, FormControl, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const TableTransaction = ({ onView, onEdit, onDelete, itemsPerPageList }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.transaction.data);
  const currentPage = useSelector((state) => state.transaction.currentPage);
  const itemsPerPage = useSelector((state) => state.transaction.itemsPerPage);
  const totalPages = useSelector((state) => state.transaction.totalPages);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  const columns = [
    { id: 1, label: 'Nama Customer' },
    { id: 2, label: 'Nama Kategori Motor' },
    { id: 3, label: 'Tanggal Masuk' },
    { id: 4, label: 'Tanggal Keluar' },
    { id: 5, label: 'Harga' },
    { id: 6, label: 'Status' },
    { id: 7, label: 'Aksi' },
  ]

  useEffect(() => {
    fetchTransactions(dispatch, customParams);
  }, [currentPage, dispatch, itemsPerPage]);

  const handlePageChange = (event, page) => {
    dispatch(setCurrentPage(page));
  };

  const handleChangeItemPerPageSelect = (e) => {
    dispatch(setItemsPerPage(e.target.value));
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px', padding: '10px' }} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((column) => {
                return <TableCell key={column.id}>{column.label}</TableCell>
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customer.name}</TableCell>
                <TableCell>{item.item.title}</TableCell>
                <TableCell>{item.date_come}</TableCell>
                <TableCell>{item.date_out}</TableCell>
                <TableCell>{item.cost_final}</TableCell>
                <TableCell>
                  {
                    item.status === 'taken' ? 
                    <Button variant='contained' color='success'>taken</Button> : 
                    <Button variant='contained' color='primary'>reserved</Button>
                  }
                </TableCell>
                <TableCell>
                  <Button sx={{ marginLeft: '5px' }} variant='contained' color='primary' onClick={() => onView(item.id)}>View</Button>
                  <Button sx={{ marginLeft: '5px' }} variant='contained' color='warning' onClick={() => onEdit(item)}>Edit</Button>
                  <Button sx={{ marginLeft: '5px' }} variant='contained' color='error' onClick={() => onDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Stack direction={'row'} spacing={2} justifyContent="space-between">
        <Pagination count={totalPages} onChange={handlePageChange} />

        <FormControl>
          <Select
            name="item per page"
            id="demo-simple-select-item-per-page"
            value={itemsPerPage}
            label="Item Per Page"
            onChange={handleChangeItemPerPageSelect}
          >
            {
              itemsPerPageList.map((item) => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Stack>

    </TableContainer>
  );
};
