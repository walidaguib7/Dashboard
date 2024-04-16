import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Webicien from "/Webicien.png";

const Header = () => {
  return (
    <div className="bg-white w-full">
      <div className="px-[50px] py-5 flex justify-between items-center">
        <div>Dashboard</div>
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
