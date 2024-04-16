import { Sidebar, MenuItem, Menu } from "react-pro-sidebar";
import Webicien from "/Webicien.png";

import { Book, Logout, MessageSharp, Person2, Work } from "@mui/icons-material";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { Badge } from "@mui/material";

const SidebarUI = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
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
          <NavLink to="/profile">
            <MenuItem icon={<Person2 />}>Profile</MenuItem>
          </NavLink>
          <NavLink to="/messages">
            <MenuItem
              suffix={<Badge badgeContent={1} color="primary" />}
              icon={<MessageSharp />}>
              Messages
            </MenuItem>
          </NavLink>

          <MenuItem icon={<Logout />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarUI;
