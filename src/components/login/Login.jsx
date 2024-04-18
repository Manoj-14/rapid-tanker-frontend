import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import TankerImage from "../../resources/images/tanker.png";
import "./login.css";
import { authUser, setUserData } from "../../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();

  console.log(useSelector((state) => state.user));
  const navigate = new useNavigate();

  const onFinish = async (values) => {
    let response = await authUser(values.username, values.password);
    if (response) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", values.username);

      navigate("/user/profile");
    } else {
      console.log("token not found");
      toast.error("Not able to login");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={TankerImage} alt="Login" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
