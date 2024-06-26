import { Input } from "@/components/ui/input";

import { Control, Controller } from "react-hook-form";
import { LoginType } from "@/utils/Types";

type FieldTypes = {
  name: "password" | "username";

  control: Control<LoginType>;
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
          className="mb-2"
          {...field}
          placeholder={placeholder}
          type={type}
        />
      )}
    />
  );
};

export default Field;
