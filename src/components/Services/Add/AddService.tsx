import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceType } from "@/utils/Types";
import SField from "../SField";
import axios from "axios";
import { useQueryClient } from "react-query";

const schema = yup.object({
  id: yup.number().required(),
  title: yup.string().required().trim(),
  description: yup.string().required().trim(),
});

const AddServiceModal = () => {
  const { control, handleSubmit, formState } = useForm<ServiceType>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
    },
  });

  const query = useQueryClient();

  const { errors } = formState;

  const Submit: SubmitHandler<ServiceType> = async (data) => {
    try {
      await axios.post("http://localhost:5171/api/services", data);
      query.invalidateQueries("services");
      data.title = "";
      data.description = "";

      // Handle successful insertion (optional)
    } catch (error) {
      // Display error message to user
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 text-white">Add Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col justify-evenly">
          <div>
            <Label htmlFor="name" className="text-right ">
              Title
            </Label>
            <SField
              name={"title"}
              control={control}
              placeholder="title"
              type="text"
            />
            {errors.title && (
              <p className="text-red-700 text-xl ">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="name" className="text-right mb-2">
              Description
            </Label>
            <SField
              name={"description"}
              control={control}
              placeholder="Description"
              type="text"
            />
            {errors.title && (
              <p className="text-red-700 text-xl mb-2">
                {errors.title.message}
              </p>
            )}
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSubmit(Submit)} type="submit">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
