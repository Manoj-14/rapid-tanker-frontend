import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../slices/userSlice";
import { setUserData } from "../../utils/apis";
// import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = new useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (!token || !email) {
        navigate("/login");
      } else {
        let userResp = await setUserData(email, token);
        await dispatch(getUser(userResp.data.user));
      }
    };
    fetchUser();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div class="container py-5">
        {user && (
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center">
                  <img
                    draggable="false"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    class="rounded-circle img-fluid"
                  />
                  <h5 class="my-3">Manoj</h5>
                  <p class="text-muted mb-1">{user.email}</p>
                  <Button onClick={showModal}>Update Password</Button>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Full Name:</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">Manoj M</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email:</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Phone:</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <a class="text-primary text-sm mb-0">Add phone</a>
                      </p>
                      <p class="text-muted mb-0">9741626527</p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Address:</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        Bengaluru{" "}
                        <a class="text-primary text-sm mb-0">Update address</a>
                      </p>
                    </div>
                    <div class="col-sm-9">
                      <a class="text-primary mb-0">Update address</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <h4 className="text-center">Change Password</h4>
        <Form
          name="change-password-form"
          className="p-3"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="change-password-form"
            >
              CHANGE PASSWORD
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserProfile;
