import { Outlet } from "react-router-dom";
import SidebarUI from "./components/layout/Sidebar/Sidebar";
import Header from "./components/layout/header/Header";

const RootLayout = () => {
  return (
    <div className="flex">
      <SidebarUI />
      <div className="w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
