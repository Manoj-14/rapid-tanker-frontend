import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch({ type: "RESET" });
    localStorage.clear();
    navigate("/login");
  }, []);
  return <div></div>;
};

export default Logout;
