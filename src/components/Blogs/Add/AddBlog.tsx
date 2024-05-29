import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Add } from "@mui/icons-material";
import AddForm from "./AddForm";

const AddBlog = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-blue-700 rounded-sm">
          <Add />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Blog</SheetTitle>
        </SheetHeader>
        <AddForm />
      </SheetContent>
    </Sheet>
  );
};

export default AddBlog;
