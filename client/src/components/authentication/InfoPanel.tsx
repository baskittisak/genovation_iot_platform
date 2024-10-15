import { memo } from "react";
import "./Auth.css";
import Image from "antd/lib/image";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import iot_info from "../../assets/iot_info.png";

function InfoPanel() {
  return (
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
  );
}

export default memo(InfoPanel);
