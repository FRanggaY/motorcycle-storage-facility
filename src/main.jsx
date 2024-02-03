import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import ItemPage from './pages/ItemPage.jsx'
import CustomerPage from './pages/CustomerPage.jsx'
import TransactionPage from './pages/TransactionPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx'
import { Provider } from "react-redux";
import store from "./redux/store";
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <a href="/dashboard">dashboard</a>
      <a href="/item">item</a>
      <a href="/customer">customer</a>
      <a href="/transaction">transaction</a>
    </div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/item",
    element: <ItemPage/>
  },
  {
    path: "/customer",
    element: <CustomerPage/>
  },
  {
    path: "/transaction",
    element: <TransactionPage/>
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
