"use client";

import useFirebaseAuth from "@/lib/hooks/useFirebaseAuth";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import LoadingSpinner from "../LoadingSpinner";

const LoginForm = () => {
  const { login } = useFirebaseAuth();

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm();

  const handleRegister: SubmitHandler<FieldValues> = async ({
    email,
    password,
  }) => {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleRegister)}
      className="space-y-5"
    >
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          required
          {...register("email", {
            required: "Email is Required",
          })}
          className={clsx(
            errors.email ? "focus:border-red-600" : "focus:border-indigo-600",
            "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg",
          )}
        />
      </div>
      {errors.email?.message && (
        <span className="text-red-500 text-xs">
          {errors.email.message.toString()}
        </span>
      )}

      <div>
        <label className="font-medium">Password</label>
        <input
          type="password"
          required
          className={clsx(
            errors.email ? "focus:border-red-600" : "focus:border-indigo-600",
            "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border shadow-sm rounded-lg",
          )}
          {...register("password", {
            required: "This field is required",
          })}
        />
      </div>
      {errors.password?.message && (
        <span className="text-red-500 text-xs">
          {errors.password.message.toString()}
        </span>
      )}

      <button className="w-full flex justify-center px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
        {isSubmitting ? (
          <LoadingSpinner className="w-6 h-6" />
        ) : (
          <span>Log in</span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
