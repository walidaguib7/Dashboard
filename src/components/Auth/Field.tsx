import { Input } from "@/components/ui/input";

import { Control, Controller } from "react-hook-form";
import { UserType } from "@/utils/Types";

type FieldTypes = {
  name: "email" | "password" | "phone";

  control: Control<UserType>;
  placeholder: string;
  type: string;
};

const Field = ({ control, name, placeholder, type }: FieldTypes) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Input
          required
          className="mb-4"
          {...field}
          placeholder={placeholder}
          type={type}
        />
      )}
    />
  );
};

export default Field;
