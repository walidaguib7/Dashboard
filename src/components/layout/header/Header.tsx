import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Webicien from "/Webicien.png";
import DrawerMenu from "../Drawer/Drawer";

const Header = () => {
  return (
    <div className="bg-white w-full">
      <div className="px-[30px] py-5 flex justify-between items-center">
        <div className="flex items-center justify-start gap-2">
          <DrawerMenu />
          <div className="text-2xl font-bold text-slate-700">Dashboard</div>
        </div>
        <div className="">
          <Avatar>
            <AvatarImage src={Webicien} />
          </Avatar>
        </div>
      </div>
    </div>
  );
};
export default Header;
