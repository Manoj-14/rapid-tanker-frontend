import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./components/sign-up/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/login/Login";
import { Provider } from "react-redux";
import store from "./store";
import NavBar from "./components/navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
