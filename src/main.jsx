import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import ItemPage from './pages/ItemPage.jsx'
import CustomerPage from './pages/CustomerPage.jsx'
import TransactionPage from './pages/TransactionPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx'
import { Provider } from "react-redux";
import store from "./redux/store";
import LandingPage from './pages/LandingPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
