import React, { useEffect, useState } from "react";
import WaterSupplierCard from "../cards/WaterSupplierCard";
import { Button, Card, Layout, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { getLocation, setUserLocation, getUserData } from "../../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { setLocation } from "../../slices/locationSlice";
import Search from "antd/es/input/Search";
import { AimOutlined } from "@ant-design/icons";

const Address = ({ displayAddress, handleSetLocation }) => {
  return (
    <Card style={{ width: 300 }} className="b-2" onClick={handleSetLocation}>
      <p>{displayAddress}</p>
    </Card>
  );
};

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { location } = useSelector((state) => state.location);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const openLocationModal = () => {
    setIsLocationModal(true);
  };

  const handleSetLocationModalClose = () => {
    setIsLocationModal(false);
  };

  const handleCurrentLocation = (addressData) => {
    setCurrentLocation((location) => addressData);
  };

  const handleSetlocation = async (lon, lat) => {
    let longitude = parseFloat(lon);
    console.log(typeof longitude);
    console.log(user.id);
    const response = await setUserLocation(
      parseFloat(lon),
      parseFloat(lat),
      user.id
    );
    handleSetLocationModalClose();
    toast.success("Location set successful");
    dispatch(setLocation(response.data));
    console.log(response.data);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (!location) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(async (result) => {
            if (result.state === "prompt") {
              showModal();
            } else {
              // const data = await getLocation(longitude, latitude, token);
              // console.log(data);
              await getUserLocation();
            }
          });
      }
    }
  }, [location]);

  const handleLocationSearchModal = () => {
    setIsLocationModal(false);
    setLocationSearchOpen(true);
  };
  const handleLocationSearchModalClose = () => {
    setLocationSearchOpen(false);
    setIsLocationModal(true);
    message.error("please set your location");
  };

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setIsModalOpen(false);
          console.log(latitude, longitude);
          const response = await getLocation(longitude, latitude);
          handleCurrentLocation(response.data);
          console.log("location data", response);
          openLocationModal();
        },
        (error) => {
          // display an error if we cant get the users position
          console.log("Error getting user location:", error);
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true,
        }
      );
    } else {
      // display an error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleOk = () => {
    getUserLocation();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ paddingTop: "3rem" }}>
      <Layout>
        <h3>Select the water suppliers </h3>
        <Layout>
          <WaterSupplierCard />
        </Layout>
      </Layout>
      <Modal
        title="Location Access"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>We need your current location to get your address</p>
      </Modal>
      <Modal
        title="Select Your Location"
        open={isLocationModal}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleLocationSearchModal}
          >
            <AimOutlined /> Search Your location
          </Button>,
        ]}
        onCancel={handleSetLocationModalClose}
      >
        {currentLocation && (
          <>
            <Address
              displayAddress={currentLocation.formatted}
              handleSetLocation={() =>
                handleSetlocation(currentLocation.lon, currentLocation.lat)
              }
            />
          </>
        )}
      </Modal>
      <Modal
        title="Search your location"
        open={locationSearchOpen}
        onCancel={handleLocationSearchModalClose}
      >
        <Search></Search>
      </Modal>
    </div>
  );
};

export default UserDashboard;
