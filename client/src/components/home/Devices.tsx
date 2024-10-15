import { memo, useCallback, useMemo } from "react";
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

interface IDevice {
  key: string;
  id: string;
  name: string;
  description: number;
}

function Devices() {
  const { data, error } = useSWR("/devices");

  const onView = useCallback((id: string) => {
    console.log("id: ", id);
  }, []);

  const onEdit = useCallback((id: string) => {
    console.log("id: ", id);
  }, []);

  const onDelete = useCallback((id: string) => {
    console.log("id: ", id);
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
    return data?.data.map((device: IDevice) => ({
      ...device,
      key: device.id,
    }));
  }, [data?.data]);

  if (!data) return <Skeleton />;
  if (error) return <Empty />;

  return (
    <Layout.Content className="devices-container">
      <Typography.Title level={3}>IoT Devices</Typography.Title>
      <Table<IDevice> columns={columns} dataSource={dataSource} />
    </Layout.Content>
  );
}

export default memo(Devices);
