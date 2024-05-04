import { Button } from "@/components/ui/button";
import { SignUpType } from "@/utils/Types";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import axios from "axios";

const schema = yup
  .object({
    email: yup.string().required().email().trim(),
    password: yup.string().required().min(8).max(15).trim(),
    username: yup.string().required().trim(),
  })
  .required();

const SignUp = () => {
  const [AlertState, setState] = useState(false);

  const navigate = useNavigate();
  const { control, reset, handleSubmit, formState } = useForm<SignUpType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const { errors } = formState;

  const Submit: SubmitHandler<SignUpType> = async (data) => {
    if (data.email == "" || data.password == "" || data.username == "") {
      console.log(errors.email?.message);
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await axios.post("http://localhost:5171/api/user/register", data);
      reset();
      setState(true);
    }
  };

  return (
    <form className="bg-white w-[400px] m-auto flex-col flex p-8 rounded-lg shadow-md">
      <p className="mb-4 font-bold text-xl m-auto">Create Account</p>
      <Controller
        name={"email"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            className="mb-2"
            {...field}
            placeholder={"Email"}
            type={"email"}
          />
        )}
      />

      {errors.email && (
        <p className="mb-2 text-red-700">{errors.email?.message}</p>
      )}
      <Controller
        name={"username"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            className="mb-2"
            {...field}
            placeholder={"Username"}
            type={"text"}
          />
        )}
      />

      {errors.username && (
        <p className="mb-2 text-red-700">{errors.username?.message}</p>
      )}

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            className="mb-2"
            {...field}
            placeholder={"Password"}
            type={"password"}
          />
        )}
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
          <AlertDescription>Account created Successfully</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default SignUp;
