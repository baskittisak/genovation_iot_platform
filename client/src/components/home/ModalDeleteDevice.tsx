import { memo, useCallback, useState } from "react";
import "./Home.css";
import axios from "axios";
import { KeyedMutator } from "swr";
import { handleError } from "../../utils/authService";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import notification from "antd/lib/notification";
import ExclamationCircleOutlined from "@ant-design/icons/ExclamationCircleOutlined";
import { IDevice } from "./interface/device.interface";

interface ModalDeleteDeviceProps {
  deviceId: string;
  isOpenModal: boolean;
  onCloseAction: (action: "delete") => void;
  mutateDevices: KeyedMutator<IDevice[]>;
}

function ModalDeleteDevice({
  deviceId,
  isOpenModal,
  onCloseAction,
  mutateDevices,
}: ModalDeleteDeviceProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { message },
      } = await axios.delete(`device/${deviceId}`);
      notification.success({
        message,
      });
      setIsLoading(false);
      onCloseAction("delete");
      mutateDevices();
    } catch (error) {
      handleError(error);
      setIsLoading(false);
      onCloseAction("delete");
    }
  }, [deviceId, onCloseAction, mutateDevices]);

  return (
    <Modal
      title={
        <Space>
          <ExclamationCircleOutlined />
          <Typography.Title level={5} className="detail-label">
            Do you want to delete?
          </Typography.Title>
        </Space>
      }
      centered
      closable={false}
      closeIcon={false}
      open={isOpenModal}
      width={400}
      footer={
        <Space>
          <Button disabled={isLoading} onClick={() => onCloseAction("delete")}>
            Cancel
          </Button>
          <Button
            color="danger"
            variant="solid"
            loading={isLoading}
            onClick={onDelete}
          >
            OK
          </Button>
        </Space>
      }
    ></Modal>
  );
}

export default memo(ModalDeleteDevice);
