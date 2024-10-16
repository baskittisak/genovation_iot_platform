import { memo, useCallback, useMemo, useState } from "react";
import "./Home.css";
import useSWR from "swr";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import Table from "antd/lib/table";
import Space from "antd/lib/space";
import Skeleton from "antd/lib/skeleton";
import Empty from "antd/lib/empty";
import Flex from "antd/lib/flex";
import Button from "antd/lib/button";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { type TableProps } from "antd";
import { IDevice } from "./interface/device.interface";
import ModalDevice from "./ModalDevice";
import DrawerDevice from "./DrawerDevice";
import ModalDeleteDevice from "./ModalDeleteDevice";

interface IOpenAction {
  create: boolean;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

type Action = "create" | "view" | "edit" | "delete";

function Devices() {
  const [deviceId, setDeviceId] = useState<string>("");
  const [isOpenAction, setIsOpenAction] = useState<IOpenAction>({
    create: false,
    view: false,
    edit: false,
    delete: false,
  });

  const { data, error, mutate } = useSWR<IDevice[]>("/devices");

  const onCreate = useCallback(() => {
    setIsOpenAction((prevState) => ({
      ...prevState,
      create: true,
    }));
  }, []);

  const onView = useCallback((id: string) => {
    setDeviceId(id);
    setIsOpenAction((prevState) => ({
      ...prevState,
      view: true,
    }));
  }, []);

  const onEdit = useCallback((id: string) => {
    setDeviceId(id);
    setIsOpenAction((prevState) => ({
      ...prevState,
      edit: true,
    }));
  }, []);

  const onDelete = useCallback((id: string) => {
    setDeviceId(id);
    setIsOpenAction((prevState) => ({
      ...prevState,
      delete: true,
    }));
  }, []);

  const onCloseAction = useCallback((action: Action) => {
    setDeviceId("");
    setIsOpenAction((prevState) => ({
      ...prevState,
      [action]: false,
    }));
  }, []);

  const columns: TableProps<IDevice>["columns"] = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <Typography.Text>{text}</Typography.Text>,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <EyeOutlined className="action" onClick={() => onView(record.id)} />
            <EditOutlined
              className="action"
              onClick={() => onEdit(record.id)}
            />
            <DeleteOutlined
              className="action"
              onClick={() => onDelete(record.id)}
            />
          </Space>
        ),
      },
    ],
    [onView, onEdit, onDelete]
  );

  const dataSource = useMemo(() => {
    return data?.map((device: IDevice) => ({
      ...device,
      key: device.id,
    }));
  }, [data]);

  if (!data && !error) return <Skeleton />;
  if (error) return <Empty />;

  return (
    <>
      <Layout.Content className="devices-container">
        <Flex justify="space-between" align="center">
          <Typography.Title level={3}>IoT Devices</Typography.Title>
          <Button type="primary" onClick={onCreate}>
            Create device
          </Button>
        </Flex>
        <Table<IDevice> columns={columns} dataSource={dataSource} />
      </Layout.Content>
      {isOpenAction.view && (
        <ModalDevice
          deviceId={deviceId}
          isOpenModal={isOpenAction.view}
          onCloseAction={onCloseAction}
        />
      )}
      {(isOpenAction.edit || isOpenAction.create) && (
        <DrawerDevice
          action={isOpenAction.edit ? "edit" : "create"}
          deviceId={deviceId}
          isOpenModal={isOpenAction.edit || isOpenAction.create}
          onCloseAction={onCloseAction}
          mutateDevices={mutate}
        />
      )}
      {isOpenAction.delete && (
        <ModalDeleteDevice
          deviceId={deviceId}
          isOpenModal={isOpenAction.delete}
          onCloseAction={onCloseAction}
          mutateDevices={mutate}
        />
      )}
    </>
  );
}

export default memo(Devices);
