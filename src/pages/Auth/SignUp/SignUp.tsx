import Field from "@/components/Auth/Field";
import { Button } from "@/components/ui/button";

import { UserType } from "@/utils/Types";
import { supabase } from "@/utils/supabase";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { control, reset, handleSubmit } = useForm<UserType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Submit: SubmitHandler<UserType> = async (data) => {
    if (data.email == "" || data.phone == null || data.password == "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      await supabase.auth.signUp(data);
      reset();
      navigate("/");
    }
  };

  return (
    <form className="bg-white w-[400px] m-auto flex-col flex p-8 rounded-lg shadow-md">
      <span className="mb-4 font-bold text-xl m-auto">Create Account</span>
      <Field control={control} name="email" placeholder="Email" type="email" />
      <Field
        control={control}
        name="phone"
        placeholder="Phone number"
        type="number"
      />
      <Field
        control={control}
        name="password"
        placeholder="Password"
        type="password"
      />
      <Button onClick={handleSubmit(Submit)} className="bg-slate-900 mb-3">
        Create account
      </Button>
      <Button className="bg-slate-700" onClick={() => navigate("/")}>
        Login
      </Button>
    </form>
  );
};

export default SignUp;
