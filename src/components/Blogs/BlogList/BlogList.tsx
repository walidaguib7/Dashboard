import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageUrl } from "@/utils/Types";
import axios from "axios";

import { useQuery, useQueryClient } from "react-query";
import Webicien from "/Webicien.png";
import { List } from "@mui/icons-material";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BlogType = {
  id: number;
  title: string;
  description: string;
  content: string;
  category_title: string;
  username: string;
  image: string;
};

const BlogList = () => {
  const client = useQueryClient();
  const { data: blogs } = useQuery("blogs", async () => {
    return await axios.get("http://localhost:5171/api/blog");
  });

  const DeleteBlog = (id: number) => {
    axios
      .delete(`http://localhost:5171/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(() => client.invalidateQueries("blogs"));
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {blogs?.data.map((blog: BlogType) => (
        <div className="w-full bg-white cursor-pointer overflow-hidden h-fit  rounded-lg  mb-2 shadow-md flex flex-col">
          <img src={`${ImageUrl}${blog.image}`} className="h-[150px] w-full" />
          <div className="p-2 flex flex-col">
            <span className="text-blue-700 font-medium text-xs">
              {blog.category_title}
            </span>
            <h3 className="text-xl font-semibold leading-tight">
              {blog.title}
            </h3>
          </div>
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={Webicien} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-blue-700">
                {blog.username}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <List />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem onClick={() => DeleteBlog(blog.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
