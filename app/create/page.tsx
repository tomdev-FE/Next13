"use client";
// Import library/hook first, and then import component
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Label, Input } from "@roketid/windmill-react-ui";

import { CreateUserSchema } from "@/utils/validationSchema";
import { Button } from "@/shared/Button";
import { ErrorMessage } from "@/shared/ErrorMessage";
import { useStateContext } from "@/context/AuthContext";
import { createUserFn, UserRequest, UserResponse } from "@/services/users";

const defaultValues: UserRequest = {
  name: "",
  password: "",
  phone: "",
  email: "",
};

export default function CreateUserPage() {
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const stateContext = useStateContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRequest>({
    defaultValues: defaultValues,
    resolver: yupResolver(CreateUserSchema),
  });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!isSafeToReset) return;
    // asynchronously reset your form values
    reset(defaultValues);
  }, [reset, isSafeToReset]);

  useEffect(() => {
    // checks if the user is authenticated
    if (!stateContext.state.authUser.authStatus) {
      router.push("/");
    }
  }, [stateContext.state.authUser.authStatus]);

  //  API Create Mutation
  const { mutate: createUser, isLoading } = useMutation(
    (userData: UserRequest) => createUserFn(userData),
    {
      onSuccess: (data: UserResponse) => {
        MySwal.fire({
          title: <strong>Success</strong>,
          html: (
            <i>You created a new user. Right now we redirect to Dashboard</i>
          ),
          icon: "success",
        }).then(() => {
          if (data.success) {
            router.push("/dashboard");
          }
        });
      },
      onError: (error: Error) => {
        console.log(error);
      },
    }
  );

  const onSubmit: SubmitHandler<UserRequest> = (data) => {
    createUser(data);
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
                Create User
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                  <span className="text-gray-200">Name</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="admin"
                    {...register("name", { required: true })}
                  />
                  {errors.name ? (
                    <ErrorMessage message={errors.name?.message} />
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
                <Label className="mt-2">
                  <span className="text-gray-200">Phone number</span>
                  <Input
                    className="mt-1"
                    type="text"
                    placeholder="Phone number"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone ? (
                    <ErrorMessage message={errors.phone?.message} />
                  ) : (
                    <div className="h-9">
                      <span></span>
                    </div>
                  )}
                </Label>
                <Label className="mt-2">
                  <span className="text-gray-200">Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email ? (
                    <ErrorMessage message={errors.email?.message} />
                  ) : (
                    <div className="h-9">
                      <span></span>
                    </div>
                  )}
                </Label>
                <Button isLoading={isLoading} title="Create User"></Button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
