"use client";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/auth/login");
    }
  }, [authUser, loading, router]);

  if (!loading && authUser) {
    return (
      <>
        <Sidebar />
        <main className="ml-60 lg:ml-80 w-[calc(100vw-16rem)] lg:w-[calc(100vw-20rem)] h-[100vh] py-10">
          {children}
        </main>
      </>
    );
  }
}
