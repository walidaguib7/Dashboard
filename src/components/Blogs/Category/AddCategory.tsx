import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropsWithChildren } from "react";
import { Controller, useForm } from "react-hook-form";
import { CategoryTypes } from "./Category";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useQueryClient } from "react-query";

const schema = yup
  .object({
    id: yup.number().required(),
    title: yup.string().required().trim(),
    description: yup.string().required().trim(),
  })
  .required();

const AddCategory = ({ children }: PropsWithChildren) => {
  const { control, getValues } = useForm<CategoryTypes>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 1,
      title: "",
      description: "",
    },
  });

  const query = useQueryClient();

  const SubmitData = async () => {
    try {
      await axios.post("http://localhost:5171/api/category", getValues());
      query.invalidateQueries("category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Controller
              name={"title"}
              control={control}
              render={({ field }) => (
                <Input
                  className="col-span-3"
                  {...field}
                  placeholder={"title"}
                  type={"text"}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              description
            </Label>
            <Controller
              name={"description"}
              control={control}
              render={({ field }) => (
                <Input
                  className="col-span-3"
                  {...field}
                  placeholder={"description"}
                  type={"text"}
                />
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => SubmitData()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
