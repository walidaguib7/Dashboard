import { Input } from "@/components/ui/input";

import { Control, Controller } from "react-hook-form";
import { ServiceType } from "@/utils/Types";

type FieldTypes = {
  name: "title" | "description";
  control: Control<ServiceType>;
  placeholder: string;
  type: string;
};

const SField = ({ control, name, placeholder, type }: FieldTypes) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Input
          className="col-span-3 mb-3 mt-2"
          {...field}
          placeholder={placeholder}
          type={type}
        />
      )}
    />
  );
};

export default SField;
