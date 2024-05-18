import { Button, Form, Input } from "antd";
import React from "react";
import "../sign-up/sign-up.css";
import { useParams } from "react-router-dom";
import useAuth from "../../customHooks/useAuth";

const WaterSourceProfileUpdate = () => {
  const { email } = useParams();
  useAuth(email);

  const onFinish = async (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome Back</p>
          <p className="alert alert-danger p-1 mt-1">
            Please Update your profile to continue!
          </p>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input Business Name" },
              {},
            ]}
          >
            <Input placeholder="Business Name" />
          </Form.Item>
          <Form.Item
            name="owner_name"
            rules={[{ required: true, message: "Please input Owner Name" }, {}]}
          >
            <Input placeholder="Owner Name" />
          </Form.Item>
          <Form.Item
            name="email"
            initialValue={email}
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input Email",
              },
              {},
            ]}
          >
            <Input disabled placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              UPDATE PROFILE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WaterSourceProfileUpdate;
