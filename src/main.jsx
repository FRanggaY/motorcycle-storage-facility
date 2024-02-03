import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import ItemPage from './pages/ItemPage.jsx'
import CustomerPage from './pages/customerPage.jsx'
import { Provider } from "react-redux";
import store from "./redux/store";
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>hello world</div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/item",
    element: <ItemPage/>
  },
  {
    path: "/customer",
    element: <CustomerPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
