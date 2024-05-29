import { MenuItem, Menu } from "react-pro-sidebar";
import Webicien from "/Webicien.png";
import { Badge } from "@mui/material";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink, useNavigate } from "react-router-dom";
import { Book, Logout, MessageSharp, Work } from "@mui/icons-material";
import { Menu as MenuIcon } from "@mui/icons-material";

const DrawerMenu = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("", { replace: true });
    window.location.reload();
  };
  return (
    <div className="Drawer">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side={"left"}>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DrawerMenu;
