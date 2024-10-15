import { memo, useCallback, useEffect, useState } from "react";
import "./Home.css";
import axios, { AxiosError } from "axios";
import useSWR, { KeyedMutator } from "swr";
import Drawer from "antd/lib/drawer";
import Input from "antd/lib/input";
import Typography from "antd/lib/typography";
import Space from "antd/lib/space";
import Skeleton from "antd/lib/skeleton";
import Empty from "antd/lib/empty";
import Button from "antd/lib/button";
import Flex from "antd/lib/flex";
import notification from "antd/lib/notification";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { IDevice } from "./interface/device.interface";

interface DrawerDeviceProps {
  deviceId: string;
  isOpenModal: boolean;
  onCloseAction: (action: "edit") => void;
  mutateDevices: KeyedMutator<IDevice[]>;
}

function DrawerDevice({
  deviceId,
  isOpenModal,
  onCloseAction,
  mutateDevices,
}: DrawerDeviceProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [feature, setFeature] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, error } = useSWR<IDevice>(`/device/${deviceId}`);

  const onInitialData = useCallback((data: IDevice) => {
    const { name, description, feature } = data;
    setName(name);
    setDescription(description);
    setFeature(feature);
  }, []);

  useEffect(() => {
    if (data) {
      onInitialData(data);
    }
  }, [data, onInitialData]);

  const onChangeFeature = useCallback((index: number, value: string) => {
    setFeature((prevState) => {
      const newFeature = [...prevState];
      newFeature[index] = value;
      return newFeature;
    });
  }, []);

  const onDeleteFeature = useCallback((index: number) => {
    setFeature((prevState) => {
      const newFeature = [...prevState];
      return newFeature.filter((_, prevIndex) => prevIndex !== index);
    });
  }, []);

  const onAddMoreFeature = useCallback(() => {
    setFeature((prevState) => {
      const newFeature = [...prevState];
      newFeature.push("");
      return newFeature;
    });
  }, []);

  const onSave = useCallback(async () => {
    try {
      setIsLoading(true);
      const body = {
        name,
        description,
        feature,
      };

      const {
        data: { message },
      } = await axios.put(`device/${deviceId}`, body);

      notification.success({
        message,
      });
      setIsLoading(false);
      onCloseAction("edit");
      mutateDevices();
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
      setIsLoading(false);
      onCloseAction("edit");
    }
  }, [name, description, feature, deviceId, onCloseAction, mutateDevices]);

  if (!data) return <Skeleton />;
  if (error) return <Empty />;

  return (
    <Drawer
      title="Edit device"
      closeIcon={false}
      onClose={() => onCloseAction("edit")}
      open={isOpenModal}
      width={500}
      extra={
        <Space>
          <Button disabled={isLoading} onClick={() => onCloseAction("edit")}>
            Cancel
          </Button>
          <Button type="primary" loading={isLoading} onClick={onSave}>
            Save
          </Button>
        </Space>
      }
    >
      <Space className="space-container" direction="vertical">
        <Space className="space-container" size={0} direction="vertical">
          <Typography.Text>Name: </Typography.Text>
          <Input
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Space>
        <Space className="space-container" size={0} direction="vertical">
          <Typography.Text>Description: </Typography.Text>
          <Input
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Space>
        <Space className="space-container" size={0} direction="vertical">
          <Typography.Text>Feature: </Typography.Text>
          <Space className="space-container" direction="vertical">
            {feature.map((value, index) => (
              <Input
                key={index.toString()}
                placeholder="Description"
                value={value}
                addonAfter={
                  feature.length > 1 && (
                    <DeleteOutlined onClick={() => onDeleteFeature(index)} />
                  )
                }
                onChange={(event) => onChangeFeature(index, event.target.value)}
              />
            ))}
          </Space>
          {feature.length < 5 && (
            <Flex justify="flex-end" className="add-more-button">
              <Button onClick={onAddMoreFeature}>Add more feature</Button>
            </Flex>
          )}
        </Space>
      </Space>
    </Drawer>
  );
}

export default memo(DrawerDevice);
