import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setItemsPerPage } from '../../redux/slices/customerSlice';
import { fetchCustomers } from '../../api/customerApi';
import { Button, FormControl, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const TableCustomer = ({ onEdit, onDelete, itemsPerPageList }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.customer.data);
  const currentPage = useSelector((state) => state.customer.currentPage);
  const itemsPerPage = useSelector((state) => state.customer.itemsPerPage);
  const totalPages = useSelector((state) => state.customer.totalPages);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  const columns = [
    { id: 1, label: 'Nama' },
    { id: 2, label: 'No HP' },
    { id: 3, label: 'Aksi' },
  ]

  useEffect(() => {
    fetchCustomers(dispatch, customParams);
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
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.no_hp}</TableCell>
                <TableCell>
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
