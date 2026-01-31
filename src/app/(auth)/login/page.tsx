"use client";

import { IPassword } from "@/components/shared/input/IPassword";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useLogin } from "./useLogin";
import { IField } from "@/components/shared/form/IField";

export default function LoginPage() {
  const { form, onSubmit, isLoading, errors } = useLogin();

  return (
    <Card className="border-none shadow-xl lg:shadow-none bg-transparent">
      <CardHeader className="space-y-1 pb-8 text-center lg:text-left">
        <div className="flex justify-center lg:justify-start mb-4">
          <Image src="/logo.webp" width={100} height={60} alt="logo_rata" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome!</CardTitle>
        <CardDescription>Enter your Email and Password</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <IField label="Email" error={errors.email?.message}>
            <Input {...form.register("email")} placeholder="admin@rata.id" />
          </IField>

          <IField label="Password" error={errors.password?.message}>
            <IPassword {...form.register("password")} placeholder="••••••••" />
          </IField>

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
