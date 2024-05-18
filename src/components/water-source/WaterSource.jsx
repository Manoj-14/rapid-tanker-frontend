import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";
import { getWaterSupplier, getWaterSupplierDummy } from "../../utils/apis";
import { useSelector } from "react-redux";
import { AccountSetupException } from "../../exceptions/AccountSetupException";

const WaterSource = () => {
  useAuth();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const fetchWaterSupplier = async () => {
      //   const response = await getWaterSupplier(email);
      try {
        const response = await getWaterSupplierDummy(user.id);
        console.log(response);
      } catch (error) {
        if (error instanceof AccountSetupException) {
          navigate(`/water-source/${email}/update`);
        }
      }
    };
    fetchWaterSupplier();
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default WaterSource;
