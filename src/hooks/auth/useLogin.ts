"use client";

import { useMutation } from "@tanstack/react-query";
import { gqlClient } from "@/lib/graphql-client";
import { LOGIN_MUTATION } from "@/graphql/mutations/auth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoginReq, LoginRes } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/app/(auth)/login/login.schema";
import { ClientError } from "graphql-request";
import { ERR, SUCCESS } from "@/constants/en/message";
import { toast } from "sonner";
import { logger } from "@/utils/logger";
import { useAuthStore } from "@/store/useAuthStore";

export function useLogin() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: async (variables: LoginReq) => {
      return await gqlClient.request<LoginRes>(LOGIN_MUTATION, variables);
    },
    onSuccess: (data) => {
      const { token, user } = data;
      logger.log("data", data);
      setUser(user);

      Cookies.set("auth_token", token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      toast.success(SUCCESS.LOGIN);
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error: ClientError) => {
      const msg = error.response?.errors?.[0]?.message || ERR.GENERAL;
      logger.error("", msg);
      toast.error(msg);
      form.setError("root", { message: msg });
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    errors: form.formState.errors,
  };
}
