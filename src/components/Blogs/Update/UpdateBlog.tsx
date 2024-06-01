import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PropsWithChildren } from "react";
import UpdateForm from "./UpdateForm";

const UpdateBlog = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Blog</DialogTitle>
        </DialogHeader>
        <UpdateForm />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBlog;
