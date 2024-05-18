import NavBar from "./navbar/NavBar";
import { Outlet } from "react-router-dom";

const TopNav = ({ location }) => {
  return (
    <div
      className="d-flex position-fixed flex-row-reverse align-items-center"
      style={{ backgroundColor: "#6CB4EE", width: "100vw", height: "3rem" }}
    >
      <div className="d-flex justify-content-center align-items-center height-100">
        <p>Hello</p>
      </div>
    </div>
  );
};

const User = () => {
  return (
    <div>
      <TopNav />
      <NavBar />
      <Outlet />
    </div>
  );
};

export default User;
