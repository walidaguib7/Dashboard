import Field from "@/components/Auth/Field";
import { Button } from "@/components/ui/button";
import { UserType } from "@/utils/Types";
import { supabase } from "@/utils/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().required().email().trim(),
    password: yup.string().required().min(8).max(15).trim(),
  })
  .required();

const SignUp = () => {
  const [AlertState, setState] = useState(false);

  const navigate = useNavigate();
  const { control, reset, handleSubmit, formState } = useForm<UserType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const Submit: SubmitHandler<UserType> = async (data) => {
    if (data.email == "" || data.password == "") {
      console.log(errors.email?.message);
    } else {
      await supabase.auth.signUp(data);
      reset();
      setState(true);
    }
  };

  return (
    <form className="bg-white w-[400px] m-auto flex-col flex p-8 rounded-lg shadow-md">
      <p className="mb-4 font-bold text-xl m-auto">Create Account</p>
      <Field control={control} name="email" placeholder="Email" type="email" />

      {errors.email && (
        <p className="mb-2 text-red-700">{errors.email?.message}</p>
      )}

      <Field
        control={control}
        name="password"
        placeholder="Password"
        type="password"
      />

      {errors.password && (
        <p className="mb-2 text-red-700">{errors.password?.message}</p>
      )}

      <Button onClick={handleSubmit(Submit)} className="bg-slate-900 mb-3">
        Create account
      </Button>
      <Button className="bg-slate-700" onClick={() => navigate("/")}>
        Login
      </Button>
      {AlertState && (
        <Alert className="mt-4">
          <RocketIcon className="h-4 w-4 " />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Check your email inbox , a verification mail has been sent!
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default SignUp;
