"use client";
// Import library/hook first, and then import component
import { useState, useEffect } from "react";
import Image from "next/image";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import { Button } from "@/shared/Button";
import { ErrorMessage } from "@/shared/ErrorMessage";
import { Label, Input } from "@roketid/windmill-react-ui";
import { useRouter } from "next/navigation";
import { LoginResponse, LoginRequest, loginFn } from "@/services/auth";
import { useStateContext } from "@/context/AuthContext";

const defaultValues: LoginRequest = {
  username: "",
  password: "",
};
const schema = yup.object({
  username: yup.string().required("Required field"),
  password: yup.string().required("Required field"),
});

export default function HomePage() {
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const stateContext = useStateContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginRequest>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isSafeToReset) return;
    // asynchronously reset your form values
    reset(defaultValues);
  }, [reset, isSafeToReset]);

  useEffect(() => {
    // checks if the user is authenticated
    if (stateContext.state.authUser.authStatus) {
      router.push("/dashboard");
    }
  }, [stateContext.state.authUser.authStatus]);

  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginRequest) => loginFn(userData),
    {
      onSuccess: (data: LoginResponse) => {
        stateContext.dispatch({
          type: "SET_USER",
          payload: { authStatus: data.auth },
        });
        router.push("/dashboard");
      },
      onError: (error: Error) => {
        console.log(error);
      },
    }
  );

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    loginUser(data);
    setIsSafeToReset(true);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full"
              src="/assets/img/login-office-dark.jpg"
              alt="Office"
              fill
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-200">
                Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                  <span className="text-gray-200">User Name</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="admin"
                    {...register("username", { required: true })}
                  />
                  {errors.username ? (
                    <ErrorMessage message={errors.username?.message} />
                  ) : (
                    <div className="h-9">
                      <span></span>
                    </div>
                  )}
                </Label>

                <Label className="mt-2">
                  <span className="text-gray-200">Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    {...register("password", { required: true })}
                  />
                  {errors.password ? (
                    <ErrorMessage message={errors.password?.message} />
                  ) : (
                    <div className="h-9">
                      <span></span>
                    </div>
                  )}
                </Label>
                <Button isLoading={isLoading} title="Log in"></Button>
              </form>
              <hr className="my-8" />
              <div>
                <Link
                  href="/"
                  className="text-sm font-medium text-purple-400 hover:underline mt-4"
                >
                  Forgot your password?
                </Link>
              </div>
              <div>
                <Link
                  href="/"
                  className="text-sm font-medium text-purple-400  hover:underline mt-2"
                >
                  Create account
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
