import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import UserDashboard from "./components/user/UserDashboard";
import UserHistory from "./components/user/UserHistory";
import UserOrders from "./components/user/UserOrders";
import UserProfile from "./components/user/UserProfile";
import Logout from "./components/user/Logout";
import WaterSourceDashboard from "./components/water-source/WaterSourceDashboard";
import User from "./components/user/User";
import WaterSourceProfileUpdate from "./components/water-source/WaterSourceProfileUpdate";
import WaterSource from "./components/water-source/WaterSource";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<SignUp />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="history" element={<UserHistory />} />
        <Route path="orders" element={<UserOrders />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route
        path="/water-source/:email/update"
        element={<WaterSourceProfileUpdate />}
      />
      <Route path="/water-source" element={<WaterSource />}>
        <Route path="dashboard" element={<WaterSourceDashboard />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
