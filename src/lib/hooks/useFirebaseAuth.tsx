import { initializeNewUser } from "@/lib/database";
import { auth } from "@/services/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type AuthUserFormattedType = { uid: string; email: string };

const formatAuthUser = (user: AuthUserFormattedType) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<null | AuthUserFormattedType>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState as any);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (response?.user?.uid) {
        initializeNewUser(response.user);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error?.toString().includes("auth/email-already-in-use")) {
        alert("Email alredy in use! Please try another one");
      }
    }
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setAuthUser(null);
      setLoading(true);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    authUser,
    loading,
    login,
    logout,
    signup,
  };
}
