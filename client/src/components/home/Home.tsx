import { memo } from "react";
import "./Home.css";
import Layout from "antd/lib/layout";
import Sidebar from "./Sidebar";
import Devices from "./Devices";

function Home() {
  return (
    <Layout>
      <Sidebar />
      <Devices />
    </Layout>
  );
}

export default memo(Home);
