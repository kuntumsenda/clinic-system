import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { loginSchema, LoginFormValues } from "./login.schema";
import { logger } from "@/utils/logger";

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    logger.log("form", data);
    setIsLoading(true);

    // masih pass untuk set cookie token
    setTimeout(() => {
      Cookies.set("auth_token", "gcaCusda//Tygdasdna", { expires: 7 });
      Cookies.set("user_role", "admin", { expires: 7 });

      router.replace("/dashboard");
      setIsLoading(false);
      router.refresh();
    }, 1500);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    errors: form.formState.errors,
  };
};
