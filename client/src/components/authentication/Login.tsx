import { memo } from "react";
import Splitter from "antd/lib/splitter";
import Panel from "antd/lib/splitter/Panel";
import Image from "antd/lib/image";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Flex from "antd/lib/flex";
import UserOutlined from "@ant-design/icons/UserOutlined";
import EyeTwoTone from "@ant-design/icons/EyeTwoTone";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import iot_logo from "../../assets/iot_logo.png";
import iot_info from "../../assets/iot_info.png";
import "./Login.css";

function Login() {
  return (
    <div className="container">
      <Splitter className="splitter">
        <Panel className="panel" resizable={false}>
          <div className="login-form">
            <Space align="center">
              <Image src={iot_logo} preview={false} width={48} height={48} />
              <Typography.Title level={3} className="topic-text">
                IoT Platform
              </Typography.Title>
            </Space>
            <Typography.Title>Log in to your account</Typography.Title>
            <Space size={36} className="space-container" direction="vertical">
              <Space
                className="space-container"
                direction="vertical"
                size="middle"
              >
                <Input
                  size="large"
                  placeholder="Username"
                  prefix={<UserOutlined />}
                />
                <Input.Password
                  size="large"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  prefix={<LockOutlined />}
                />
              </Space>
              <Button type="primary" size="large" block>
                Log in
              </Button>
            </Space>
            <Flex justify="center" className="footer-form">
              <Typography.Text>Don't have an account?</Typography.Text>
              <Typography.Link>Create an account</Typography.Link>
            </Flex>
          </div>
        </Panel>
        <Panel className="panel" resizable={false}>
          <Space className="space-container info-onboard" direction="vertical">
            <Image className="img-info" src={iot_info} preview={false} />
            <Space size={0} direction="vertical">
              <Typography.Title level={3} className="info-text">
                Redefining possibilities with IoT.
              </Typography.Title>
              <Typography.Text className="info-text">
                Smarter solutions for a connected life.
              </Typography.Text>
            </Space>
          </Space>
        </Panel>
      </Splitter>
    </div>
  );
}

export default memo(Login);
