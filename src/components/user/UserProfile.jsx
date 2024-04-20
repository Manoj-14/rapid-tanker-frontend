import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setuser } from "../../slices/userSlice";
import { getUserData } from "../../utils/apis";
// import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = new useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container py-5">
        {user && (
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    draggable="false"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                  />
                  <h5 className="my-3">Manoj</h5>
                  <p className="text-muted mb-1">{user.email}</p>
                  <Button onClick={showModal}>Update Password</Button>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Manoj M</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        <a className="text-primary text-sm mb-0">Add phone</a>
                      </p>
                      <p className="text-muted mb-0">9741626527</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        Bengaluru{" "}
                        <a className="text-primary text-sm mb-0">
                          Update address
                        </a>
                      </p>
                    </div>
                    <div className="col-sm-9">
                      <a className="text-primary mb-0">Update address</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <h4 classNameName="text-center">Change Password</h4>
        <Form
          name="change-password-form"
          classNameName="p-3"
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
              classNameName="change-password-form"
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
