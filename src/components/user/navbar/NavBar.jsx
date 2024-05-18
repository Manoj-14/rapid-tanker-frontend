import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import "./nav-bar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Layout className="sider" hasSider>
      <Sider
        breakpoint="sm"
        collapsible
        defaultCollapsed={true}
        collapsedWidth="0"
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/user/dashboard">
              <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/user/history">History</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/user/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/user/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default NavBar;
