import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import store from "../store";

export const registerUser = async (email, password, accountType) => {
  console.log(email, password, accountType);
  const response = await axios
    .post(`${BASE_URL}/user/register`, {
      email,
      password,
      accountType,
    })
    .catch((err) => {
      //   console.log(err.response.data.detail);
      toast.error(err.response.data.detail);
    });
  return response;
};

export const authUser = async (email, password) => {
  console.log(email, password);
  const response = await axios
    .post(`${BASE_URL}/user/authenticate`, {
      email,
      password,
    })
    .catch((err) => {
      //   console.log(err.response.data.detail);
      toast.error(err.response.data.detail);
    });
  return response;
};
export const setUserData = async (email, token) => {
  const response = await axios
    .get(`${BASE_URL}/user/get/${email}?type=user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.detail);
    });
  return response;
};

export const getLocation = async (longitude, latitude) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/location`, {
    params: { lon: longitude, lat: latitude },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const setLocation = async (longitude, latitude, userId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/user/location/${userId}`,
    { latitude, longitude },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        latitude,
        longitude,
      },
    }
  );
  return response;
};
