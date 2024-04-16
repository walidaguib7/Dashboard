import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <div className="bg-white w-full">
      <div className="px-[50px] py-5 flex justify-between items-center">
        <div>
          Dashboard
          <div>
            <Avatar>
              <AvatarImage src="" />
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
