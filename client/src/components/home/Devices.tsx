import { memo, useCallback, useMemo, useState } from "react";
import "./Home.css";
import useSWR from "swr";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import Table from "antd/lib/table";
import Space from "antd/lib/space";
import Skeleton from "antd/lib/skeleton";
import Empty from "antd/lib/empty";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { type TableProps } from "antd";
import Device from "./Device";

interface IDevice {
  key: string;
  id: string;
  name: string;
  description: number;
}

interface IOpenAction {
  view: boolean;
  edit: boolean;
  delete: boolean;
}

type Action = "view" | "edit" | "delete";

function Devices() {
  const [deviceId, setDeviceId] = useState<string>("");
  const [isOpenAction, setIsOpenAction] = useState<IOpenAction>({
    view: false,
    edit: false,
    delete: false,
  });

  const { data, error } = useSWR<IDevice[]>("/devices");

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


  if (!data) return <Skeleton />;
  if (error) return <Empty />;

  return (
    <>
      <Layout.Content className="devices-container">
        <Typography.Title level={3}>IoT Devices</Typography.Title>
        <Table<IDevice> columns={columns} dataSource={dataSource} />
      </Layout.Content>
      {isOpenAction.view && (
        <Device
          deviceId={deviceId}
          isOpenModal={isOpenAction.view}
          onCloseAction={onCloseAction}
        />
      )}
    </>
  );
}

export default memo(Devices);
