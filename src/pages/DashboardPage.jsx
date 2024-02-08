import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../utils/getLPTheme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardGroupedCustomer, fetchDashboardGroupedItemBrand, fetchDashboardMonthlyDateCome, fetchDashboardTotalCustomer, fetchDashboardTotalItem, fetchDashboardTotalTransaction } from '../api/dashboardApi';
import { fetchItems } from '../api/itemApi';
import { fetchCustomers } from '../api/customerApi';
import { fetchDataIfNeeded } from '../utils/fetchData';
import { Box, Button, Card, CardContent, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import NavAppBar from '../components/Common/NavAppBar';
import Chart from "react-apexcharts";
import Footer from '../components/Common/Footer';

function DashboardPage() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const LPtheme = createTheme(getLPTheme(mode));
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
  const transactionStatus = useSelector((state) => state.transaction.transactionStatus);
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
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <NavAppBar />
      <Box sx={{ bgcolor: 'background.default', pt: { xs: 4, sm: 12 }, pb: { xs: 8, sm: 16 }, }}>
        <Container>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={1}>
                <TextField
                  id="year"
                  name="year"
                  label="Tahun"
                  type="number"
                  value={formData.year}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="brand"
                  name="brand"
                  label="Brand Motor"
                  type="text"
                  value={formData.brand}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label-item-id">Kategori Motor</InputLabel>
                  <Select
                    labelId="select-label-item-id"
                    name="item_id"
                    id="select_item_id"
                    value={formData.item_id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dataItem.length > 0 &&
                      dataItem.map((data, i) => {
                        return <MenuItem value={data.id} key={data.id}>
                          {data.title}
                        </MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label-customer-id">Customer</InputLabel>
                  <Select
                    labelId="select-label-customer-id"
                    name="customer_id"
                    id="select_customer_id"
                    value={formData.customer_id}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {dataCustomer.length > 0 &&
                      dataCustomer.map((data, i) => {
                        return <MenuItem value={data.id} key={data.id}>
                          {data.name}
                        </MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="date_come"
                  name="date_come"
                  type="datetime-local"
                  value={formData.date_come}
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel id="select-label-transaction_status">Transaksi Status</InputLabel>
                  <Select
                    labelId="select-label-transaction_status"
                    name="transaction_status"
                    id="select_transaction_status"
                    value={formData.transaction_status}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {transactionStatus.length > 0 &&
                      transactionStatus.map((data, i) => {
                        return <MenuItem value={data.id} key={data.id}>
                          {data.id}
                        </MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button type='submit' variant='contained'>Find</Button>
              </Grid>
            </Grid>
          </form>

          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Customer
                  </Typography>
                  <Typography variant="h5" component="div">
                    {totalCustomer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Kategori Motor
                  </Typography>
                  <Typography variant="h5" component="div">
                    {totalItem}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Transaksi
                  </Typography>
                  <Typography variant="h5" component="div">
                    {totalTransaction}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: '20px' }}>
            {dataGroupedCustomer.length > 0 &&
              <Grid item xs={12} sm={6}>
                <Chart
                  options={{
                    labels: dataGroupedItemBrand.map(item => item.brand),
                    legend: {
                      labels: {
                        colors: mode == "light" ? 'black' : 'white'
                      }
                    },
                    tooltip: {
                      custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        const brand = w.config.labels[seriesIndex];
                        const total = series[seriesIndex];
                        return (
                          '<div class="arrow_box">' +
                          '<span>' + brand + ': ' + total + 'transaksi </span>' +
                          '</div>'
                        );
                      }
                    }
                  }}
                  series={dataGroupedItemBrand.map(item => item.total)}
                  type="donut"
                />
              </Grid>
            }
            {dataGroupedCustomer.length > 0 &&
              <Grid item xs={12} sm={6}>
                <Chart style={{ color: 'black' }}
                  options={{
                    legend: {
                      labels: {
                        colors: mode == "light" ? 'black' : 'white'
                      }
                    },
                    xaxis: {
                      categories: dataGroupedCustomer.map(data => data.name),
                    },
                    tooltip: {
                      custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        const category = w.globals.labels[dataPointIndex];
                        const value = series[seriesIndex][dataPointIndex];
                        return '<div class="arrow_box">' +
                          '<span>' + category + ': ' + value + ' transaksi </span>' +
                          '</div>';
                      }
                    }
                  }}
                  series={[{
                    data: dataGroupedCustomer.map(data => data.total)
                  }]}
                  type="bar"
                />
              </Grid>
            }
            {dataMonthlyDateCome.length > 0 &&
              <Grid item xs={12} sm={6}>
                <Chart style={{ color: 'black' }}
                  options={{
                    legend: {
                      labels: {
                        colors: mode == "light" ? 'black' : 'white'
                      }
                    },
                    xaxis: {
                      categories: dataMonthlyDateCome.map(data => data.month),
                    },
                    tooltip: {
                      custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        const value = series[seriesIndex][dataPointIndex];
                        return '<div class="arrow_box">' +
                          '<span>' +  value + ' transaksi </span>' +
                          '</div>';
                      }
                    }
                  }}
                  series={[{
                    data: dataMonthlyDateCome.map(data => data.total)
                  }]}
                  type="line"
                />
              </Grid>
            }
          </Grid>

        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
export default DashboardPage;
