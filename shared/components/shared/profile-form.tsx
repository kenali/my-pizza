"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  formRegisterSchema,
  TFormRegisterValues,
} from "./modals/auth-modal/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions";

interface Props {
  data: User;
}

export const ProfileForm = ({ data }: Props) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success("Data updated", {
        icon: "✅",
      });
    } catch (error) {
      toast.error("Error updating data", {
        icon: "❌",
      });
    }
  };

  const onClickSignOut = async () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Personal data | #${data.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Full name" required />

          <FormInput
            type="password"
            name="password"
            label="New password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            required
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Sign out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
