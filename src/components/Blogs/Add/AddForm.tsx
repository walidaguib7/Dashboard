/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

import { useForm } from "react-hook-form";
import { BlogTypes, Blogschema } from "../BlogTypes";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryTypes } from "../Category/Category";
import { Add, ErrorOutline } from "@mui/icons-material";
import AddCategory from "../Category/AddCategory";
import { useUpload } from "@/hooks/Blog/useUpload";
import { usePost } from "@/hooks/Blog/usePost";

const AddForm = () => {
  const { Submit, Upload, fl, isFileError } = useUpload();

  const { data } = useQuery(
    "categories",
    async () => {
      return await axios.get("http://localhost:5171/api/category");
    },
    { refetchIntervalInBackground: true }
  );

  const form = useForm<BlogTypes>({
    resolver: yupResolver(Blogschema),
    defaultValues: {
      Title: "",
      content: "",
      description: "",
      userId: sessionStorage.getItem("userId") || "",
      categoryId: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { SubmitForm } = usePost({
    reset: form.reset,
    categoryId: form.getValues().categoryId,
    data: {
      id: 0,
      title: form.getValues().Title,
      description: form.getValues().description,
      content: form.getValues().content,
      categoryId: form.getValues().categoryId,
      userId: sessionStorage.getItem("userId") || "",
      fileId: fl,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          SubmitForm();
        }}
        className="flex flex-col gap-4 mt-4">
        <div className="flex gap-3">
          <Input type="file" onChange={Upload} placeholder="choose an image" />
          {isFileError == true ? (
            <Button className="bg-red-600">
              <ErrorOutline />
            </Button>
          ) : (
            <Button className="bg-blue-700" onClick={Submit}>
              Upload Image
            </Button>
          )}
        </div>

        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this blog"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 ">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.data.map((category: CategoryTypes) => (
                      <SelectItem value={category.id.toString()}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <AddCategory>
            <Button className="bg-blue-700">
              <Add />
            </Button>
          </AddCategory>
        </div>
        <Button className="bg-blue-700">Submit</Button>
      </form>
    </Form>
  );
};

export default AddForm;
