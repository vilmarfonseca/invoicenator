"use client";

import LoginForm from "@/components/Forms/LoginForm";
import Logo from "@/components/Logo";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Login = () => {
  const router = useRouter();
  const { currentUser }: any = useContext(AuthContext);

  if (currentUser) {
    router.push("/dashboard");
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <Link href="/">
            <div className="flex justify-center">
              <Logo />
            </div>
          </Link>
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <LoginForm />
        </div>
        <div className="text-center">
          <p className="">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
