import { memo, useCallback, useState } from "react";
import "./Login.css";
import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";
import { InputStatus } from "antd/lib/_util/statusUtils";
import { useNavigate } from "react-router-dom";
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
import notification from "antd/lib/notification";
import iot_logo from "../../assets/iot_logo.png";
import iot_info from "../../assets/iot_info.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<{
    username?: InputStatus;
    password?: InputStatus;
  }>();

  const onChangeUserName = useCallback((value: string) => {
    setUsername(value);
    setStatus((status) => ({
      ...status,
      username: !value ? "error" : "",
    }));
  }, []);

  const onChangeUserPassword = useCallback((value: string) => {
    setPassword(value);
    setStatus((status) => ({
      ...status,
      password: !value ? "error" : "",
    }));
  }, []);

  const onLogin = useCallback(async () => {
    try {
      const {
        data: { data: token },
      } = await axios.post("/login", { username, password });
      const cookies = new Cookies();
      cookies.set("access_token", token);
      navigate(0);
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: error.response?.data?.message,
          description: "Please try again.",
        });
      } else {
        notification.error({
          message: (error as string).toString(),
          description: "Please try again.",
        });
      }
    }
  }, [username, password, navigate]);

  const onValidateLogin = useCallback(async () => {
    if (!username || !password) {
      setStatus(() => ({
        username: !username ? "error" : "",
        password: !password ? "error" : "",
      }));
    }

    if (username && password) {
      await onLogin();
    }
  }, [username, password, onLogin]);

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
                  onChange={(event) => onChangeUserName(event.target.value)}
                  status={status?.username}
                />
                <Input.Password
                  size="large"
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  prefix={<LockOutlined />}
                  onChange={(event) => onChangeUserPassword(event.target.value)}
                  status={status?.password}
                />
              </Space>
              <Button
                type="primary"
                size="large"
                block
                onClick={onValidateLogin}
              >
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
