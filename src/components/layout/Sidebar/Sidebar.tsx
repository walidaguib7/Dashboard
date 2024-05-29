import { Sidebar, MenuItem, Menu } from "react-pro-sidebar";
import Webicien from "/Webicien.png";

import { Book, Logout, MessageSharp, Work } from "@mui/icons-material";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";

const SidebarUI = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("", { replace: true });
    window.location.reload();
  };
  return (
    <div style={{ display: "flex", height: "750px" }}>
      <Sidebar className="app max-md:hidden">
        <Menu>
          <NavLink to={""}>
            <img src={Webicien} className="m-auto" alt="" />
          </NavLink>

          <NavLink to="/blogs">
            <MenuItem icon={<Book />}>Blogs</MenuItem>
          </NavLink>
          <NavLink to="/services">
            <MenuItem icon={<Work />}>Services</MenuItem>
          </NavLink>

          <NavLink to="/messages">
            <MenuItem
              suffix={<Badge badgeContent={1} color="primary" />}
              icon={<MessageSharp />}>
              Messages
            </MenuItem>
          </NavLink>

          <MenuItem onClick={() => logout()} icon={<Logout />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarUI;
