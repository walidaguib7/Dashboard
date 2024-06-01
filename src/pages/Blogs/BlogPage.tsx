import AddBlog from "@/components/Blogs/Add/AddBlog";
import BlogList from "@/components/Blogs/BlogList/BlogList";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const BlogPage = () => {
  const [title, setTitle] = useState("");
  return (
    <div className="px-[30px] pt-6 ">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold text-slate-700 flex-1">Blogs</h2>
        <div className="flex gap-3">
          <AddBlog />
          <Input
            className="border-2 border-slate-700 shadow-lg"
            placeholder="search..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="pt-6">
        <BlogList title={title} />
      </div>
    </div>
  );
};

export default BlogPage;
