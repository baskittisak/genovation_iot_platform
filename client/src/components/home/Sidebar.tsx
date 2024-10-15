import { memo, useCallback, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Image from "antd/lib/image";
import Space from "antd/lib/space";
import Avatar from "antd/lib/avatar";
import Typography from "antd/lib/typography";
import modal from "antd/lib/modal";
import DatabaseOutlined from "@ant-design/icons/DatabaseOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import iot_logo from "../../assets/iot_logo.png";

const items = [{ key: "1", icon: <DatabaseOutlined />, label: "IoT Devices" }];

function SideBar() {
  const [cookies] = useState(new Cookies());
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    cookies.remove("access_token");
    cookies.remove("username");
    navigate(0);
  }, [cookies, navigate]);

  const onConfirmLogout = useCallback(() => {
    modal.confirm({
      title: "Do you want to log out?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => onLogout(),
    });
  }, [onLogout]);

  return (
    <Layout.Sider className="sidebar-container">
      <Space className="logo" align="center">
        <Image src={iot_logo} preview={false} width={48} height={48} />
        <Typography.Title level={4} className="topic-text">
          IoT Platform
        </Typography.Title>
      </Space>
      <Menu
        className="menu-container"
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <Space
        className="user-container"
        align="center"
        onClick={onConfirmLogout}
      >
        <Avatar className="avatar-user" icon={<UserOutlined />} />
        <Typography.Text className="username">
          {cookies.get("username")}
        </Typography.Text>
      </Space>
    </Layout.Sider>
  );
}

export default memo(SideBar);
