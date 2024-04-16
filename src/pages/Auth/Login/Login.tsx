import {} from "@mui/material";
import "./login.css";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserType } from "@/utils/Types";
import Field from "@/components/Auth/Field";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/utils/supabase";
import { ToastAction } from "@/components/ui/toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const { control, reset, handleSubmit, formState } = useForm<UserType>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const Submit: SubmitHandler<UserType> = async (data) => {
    if (data.email == "" || data.password == "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      const { data: cred } = await supabase.auth.signInWithPassword(data);
      const userId = cred.user?.id || "";
      sessionStorage.setItem("user", userId);
      sessionStorage.setItem("token", cred.session?.access_token || "");
      reset();
      window.location.reload();
      navigate("/");
    }
  };

  const { errors } = formState;

  return (
    <form className="bg-white w-[400px] m-auto flex-col flex p-8 rounded-lg shadow-md">
      <span className="mb-4 font-bold text-xl m-auto">Login</span>
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
