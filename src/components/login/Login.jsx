import { Button, Card, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import TankerImage from "../../resources/images/tanker.png";
import "./login.css";
import { authUser, getUserData } from "../../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../../slices/userSlice";

const SelectAccountTypeModal = ({ accountType, handleRedirection }) => {
  var accountTypeText;
  switch (accountType) {
    case "USER":
      accountTypeText = "USER";
      break;
    case "WATER_SUPPLIER":
      accountTypeText = "WATER SUPPLIER";
      break;
    case "TANKER_SUPPLIER":
      accountTypeText = "TANKER SUPPLIER";
      break;
    case "TANKER":
      accountTypeText = "TANKER";
      break;
    default:
      console.log("Account type", accountType);
      break;
  }
  return (
    <Card
      style={{ width: 300 }}
      className="b-2"
      onClick={() => handleRedirection(accountType)}
    >
      <p>{accountTypeText}</p>
    </Card>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);
  console.log(useSelector((state) => state.user));
  const navigate = new useNavigate();

  const openAccountTypeModel = () => {
    setIsAccountTypeOpen(true);
  };

  const closeAccountTypeModel = () => {
    setIsAccountTypeOpen(false);
  };

  const handleAccountTypeRedirection = (accountType) => {
    switch (accountType) {
      case "USER":
        navigate("/user/dashboard");
        break;
      case "WATER_SUPPLIER":
        navigate("/water-supplier/dashboard");
        break;
      case "TANKER_SUPPLIER":
        console.log("tanker supplier dashboard");
        break;
      case "TANKER":
        console.log("tanker dashboard");
        break;
      default:
        console.log(accountType);
        break;
    }
    closeAccountTypeModel();
  };

  const onFinish = async (values) => {
    let response = await authUser(values.username, values.password);
    if (response) {
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", values.username);
      const userResponse = await getUserData(values.username, token);
      const userData = await userResponse.data.user;
      setAccountTypes((p) => userData.accountTypes);
      dispatch(setUser(userData));
      if (accountTypes.length > 1) {
        openAccountTypeModel();
      } else {
        handleAccountTypeRedirection(accountTypes[0]);
      }
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
      <Modal
        title="Select Account Type"
        open={isAccountTypeOpen}
        footer={null}
        onCancel={closeAccountTypeModel}
      >
        {accountTypes.map((type) => {
          console.log(type);
          return (
            <SelectAccountTypeModal
              key={`${type}-1`}
              accountType={type}
              handleRedirection={handleAccountTypeRedirection}
            />
          );
        })}
      </Modal>
    </div>
  );
};

export default Login;
