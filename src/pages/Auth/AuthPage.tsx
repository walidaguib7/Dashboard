import { Outlet } from "react-router-dom";
import Webicien from "/Webicien.png";

const AuthPage = () => {
  return (
    <div className="w-full ">
      <img src={Webicien} className="w-[200px] m-auto" />
      <Outlet />
    </div>
  );
};

export default AuthPage;
