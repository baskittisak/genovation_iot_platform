import { memo } from "react";
import "./Home.css";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <>
      <Sidebar />
    </>
  );
}

export default memo(Home);
