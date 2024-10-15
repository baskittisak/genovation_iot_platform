import { memo } from "react";
import "./Home.css";
import useSWR from "swr";
import Modal from "antd/lib/modal";
import Skeleton from "antd/lib/skeleton";
import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { IDevice } from "./interface/device.interface";

interface DeviceProps {
  deviceId: string;
  isOpenModal: boolean;
  onCloseAction: (action: "view") => void;
}

function ModalDevice({ deviceId, isOpenModal, onCloseAction }: DeviceProps) {
  const { data, error } = useSWR<IDevice>(`/device/${deviceId}`);

  if (!data) return <Skeleton />;
  if (error) return <Empty />;

  return (
    <Modal
      className="modal-device"
      title="Device detail"
      centered
      closable={false}
      closeIcon={false}
      open={isOpenModal}
      footer={
        <Button type="primary" onClick={() => onCloseAction("view")}>
          OK
        </Button>
      }
      width={800}
    >
      <Space direction="vertical">
        <Space align="start">
          <Typography.Title level={5} className="detail-label">
            Name:
          </Typography.Title>
          <Typography.Title level={5} className="detail-text">
            {data.name}
          </Typography.Title>
        </Space>
        <Space align="start">
          <Typography.Title level={5} className="detail-label">
            Description:
          </Typography.Title>
          <Typography.Title level={5} className="detail-text">
            {data.description}
          </Typography.Title>
        </Space>
        <Space align="start">
          <Typography.Title level={5} className="detail-label">
            Feature:
          </Typography.Title>
          <Typography.Title level={5} className="detail-text">
            {data.feature.join(", ")}
          </Typography.Title>
        </Space>
      </Space>
    </Modal>
  );
}

export default memo(ModalDevice);
