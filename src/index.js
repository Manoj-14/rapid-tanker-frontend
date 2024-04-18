import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import store from "./store";
import UserDashboard from "./components/user/UserDashboard";
import UserHistory from "./components/user/UserHistory";
import UserOrders from "./components/user/UserOrders";
import UserProfile from "./components/user/UserProfile";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<SignUp />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<App />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="history" element={<UserHistory />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
