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
import { useQuery } from "react-query";

import { useForm } from "react-hook-form";
import { BlogTypes, Blogschema } from "../BlogTypes";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCallback, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CategoryTypes } from "../Category/Category";

const AddForm = () => {
  const [fl, setFileId] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const Submit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!file) {
        alert("Please select a file to upload");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      await axios
        .post("http://localhost:5171/api/files", formData, {
          headers: {
            Accept: "/",
            "Content-Type": "'multipart/form-data'",
          },
        })
        .then((res) => {
          setFileId(res.data.id);
        })
        .catch((err) => alert(err));
    },
    [file]
  );

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
  const SubmitForm = useCallback(async () => {
    const data = {
      Title: form.getValues().Title,
      description: form.getValues().description,
      content: form.getValues().content,
      userId: form.getValues().userId,
      fileId: fl,
    };
    const response = await axios
      .post(
        `http://localhost:5171/api/blog/${parseInt(
          form.getValues().categoryId
        )}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [fl, form]);

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
          <Button className="bg-blue-700" onClick={Submit}>
            Upload Image
          </Button>
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
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button className="bg-blue-700">Submit</Button>
      </form>
    </Form>
  );
};

export default AddForm;
