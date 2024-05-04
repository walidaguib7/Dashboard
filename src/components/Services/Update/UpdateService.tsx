import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { ServiceType } from "@/utils/Types";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQueryClient } from "react-query";
import SField from "../SField";
import { Label } from "@/components/ui/label";
import * as yup from "yup";

const schema = yup.object({
  id: yup.number().required(),
  title: yup.string().required().trim(),
  description: yup.string().required().trim(),
});

type UpdateProps = {
  id: number;
};

const UpdateService = ({ id }: UpdateProps) => {
  //   const { data } = useQuery(["service", id]);

  const { control, handleSubmit, formState, reset } = useForm<ServiceType>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const response = await axios.get(
        `http://localhost:5171/api/services/${id}`
      );

      return {
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
      };
    },
  });

  const query = useQueryClient();

  const { errors } = formState;

  const Submit: SubmitHandler<ServiceType> = async (data) => {
    try {
      await axios.put(`http://localhost:5171/api/services/${id}`, data);
      query.invalidateQueries("services");
      reset();

      // Handle successful insertion (optional)
    } catch (error) {
      // Display error message to user
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 text-white">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Service</DialogTitle>
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

export default UpdateService;
