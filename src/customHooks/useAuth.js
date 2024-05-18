import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (email = localStorage.getItem("email")) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const { sub } = jwtDecode(token);
    console.log(sub, email);
    if (!token || !email || email !== sub) {
      navigate("/login");
      return false;
    }
  }, []);
  return true;
};

export default useAuth;
