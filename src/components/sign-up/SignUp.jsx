import { Button, Checkbox, Form, Input, Radio } from "antd";
import React from "react";
import TankerImage from "../../resources/images/tanker.png";
import "./sign-up.css";
import { registerUser } from "../../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // const navigate = useNavigate();

  const onFinish = async (values) => {
    let response = await registerUser(
      values.username,
      values.password,
      values.accountType
    );
    if (response) {
      console.log(response);
      toast.success("Registration successfull please login..");
      // toast.done(() => {
      //   navigate("/login");
      // });
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
          <p className="form-title">Welcome to Rapid Tanker</p>
          <p>Register Yourself</p>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              {},
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="accountType">
            <Radio.Group>
              <Radio.Button className="radio-button" value="USER">
                USER
              </Radio.Button>
              <Radio.Button className="radio-button" value="WATER_SUPPLIER">
                WATER SUPPLIER
              </Radio.Button>
              <Radio.Button className="radio-button" value="tanker">
                TANKER
              </Radio.Button>
              <Radio.Button className="radio-button" value="tanker-supplier">
                TANKER SUPPLIER
              </Radio.Button>
            </Radio.Group>
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              REGISTER
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
