import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const token = localStorage.getItem("authToken");

  const onClick = (e) => {
    if (e.key === "logout") {
      localStorage.removeItem("authToken");
      setCurrent("/login");
      navigate("/login");
      return;
    }
    setCurrent(e.key);
    navigate(e.key);
  };

  const items = [
    { label: "Home", key: "/", icon: <HomeOutlined />, hidden: !token },
    { label: "List", key: "/list", icon: <AppstoreOutlined /> },
    {
      label: "Create",
      key: "/create",
      icon: <PlusCircleOutlined />,
      hidden: !token,
    },
    { label: "Update", key: "/update", icon: <EditOutlined />, hidden: !token },
    {
      label: "Delete",
      key: "/delete",
      icon: <DeleteOutlined />,
      hidden: !token,
    },
    {
      label: "Profile",
      key: "/profile",
      icon: <UserOutlined />,
      hidden: !token,
    },
    {
      label: "Register",
      key: "/register",
      icon: <UserAddOutlined />,
      hidden: token,
    },
    { label: "Login", key: "/login", icon: <LoginOutlined />, hidden: token },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      hidden: !token,
    },
  ];

  const visibleItems = items.filter((item) => !item.hidden);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="light"
      items={visibleItems}
      style={{ borderBottom: "1px solid #ddd" }}
    />
  );
};

export default Navbar;
