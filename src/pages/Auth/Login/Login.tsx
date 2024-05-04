import {} from "@mui/material";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "@/utils/Types";
import Field from "@/components/Auth/Field";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const schema = yup
  .object({
    password: yup.string().required().min(12).max(25).trim(),
    username: yup.string().required().trim(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const { control, reset, handleSubmit, formState } = useForm<LoginType>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const Submit: SubmitHandler<LoginType> = async (data) => {
    if (data.username == "" || data.password == "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      await axios
        .post("http://localhost:5171/api/user/login", data)
        .then((res) => {
          sessionStorage.setItem("user", res.data.userName);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userId", res.data.userId);
        });
      reset();

      window.location.reload();
      navigate("/", { replace: true });
    }
  };

  const { errors } = formState;

  return (
    <form className="bg-white w-[400px] m-auto flex-col flex p-8 rounded-lg shadow-md">
      <span className="mb-4 font-bold text-xl m-auto">Login</span>

      <Field
        control={control}
        name="username"
        placeholder="Username"
        type="text"
      />

      {errors.username && (
        <p className="mb-2 text-red-700">{errors.username?.message}</p>
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

      <Button
        type="submit"
        onClick={handleSubmit(Submit)}
        className="bg-slate-900 mb-3">
        Sign In
      </Button>

      <Button className="bg-slate-700 " onClick={() => navigate("/create")}>
        Create account
      </Button>
    </form>
  );
};

export default Login;
