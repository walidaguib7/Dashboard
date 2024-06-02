import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlogType, ImageUrl } from "@/utils/Types";
import axios from "axios";

import { useQuery, useQueryClient } from "react-query";
import Webicien from "/Webicien.png";
import { Delete, Update } from "@mui/icons-material";
import { useBlogStore } from "@/store/BlogStore";
import UpdateBlog from "../Update/UpdateBlog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ListProps = {
  title: string;
};

const BlogList = ({ title }: ListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);

  const client = useQueryClient();
  const blogStore = useBlogStore();
  const { data: blogs } = useQuery(
    ["blogs", page, title],
    async () => {
      return await axios.get(
        `http://localhost:5171/api/blog?Title=${title}&PageNumber=${page}&Limit=${3}`
      );
    },
    {
      refetchOnMount: "always",
    }
  );

  const DeleteBlog = (id: number) => {
    axios
      .delete(`http://localhost:5171/api/blog/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(() => client.invalidateQueries("blogs"));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {blogs?.data.map((blog: BlogType) => (
          <div className="w-full bg-white cursor-pointer overflow-hidden h-fit  rounded-lg  mb-2 shadow-md flex flex-col">
            <img
              src={`${ImageUrl}${blog.image}`}
              className="h-[150px] w-full"
            />
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
              <div className="flex gap-2">
                <UpdateBlog>
                  <Update
                    color="primary"
                    onClick={() => {
                      blogStore.setId(blog.id);
                      blogStore.setData({
                        title: blog.title,
                        description: blog.description,
                        content: blog.content,
                      });
                    }}
                  />
                </UpdateBlog>
                <Delete color="error" onClick={() => DeleteBlog(blog.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full">
        <div className="mt-4  flex justify-center gap-8 items-center m-auto">
          <Button
            className="bg-blue-700"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page == 1}>
            -
          </Button>
          <span>{page}</span>
          <Button
            className="bg-blue-700"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={blogs?.data.length != 3}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
