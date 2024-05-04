import { Outlet } from "react-router-dom";
import SidebarUI from "./components/layout/Sidebar/Sidebar";
import Header from "./components/layout/header/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const RootLayout = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="flex">
        <SidebarUI />
        <div className="w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default RootLayout;
