import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";
import { Title } from "../../../title";
import { registerUser } from "@/app/actions";

interface Props {
  onClose: VoidFunction;
}

export const RegisterForm = ({ onClose }: Props) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Registration successful", {
        icon: "✅",
      });
      onClose?.();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Registration failed", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Create account" size="md" className="font-bold" />
            <p className="text-gray-400">
              Enter your details to create an account
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="fullName" label="Full name" required />
        <FormInput name="email" label="E-mail" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
