import { useAuth } from "@/context/authContext";
import { getCollection, saveInvoiceToFB } from "@/lib/database";
import { getTotalPrice } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

const setUserDataState = async (authUser: any, setUserData: any) => {
  if (authUser?.uid) {
    try {
      const data = await getCollection(authUser, "userData");
      if (data) {
        setUserData(data as any);
      }
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  }
};

const setUserInvoices = async (
  authUser: any,
  setInvoicesData: any,
  setLoading: any,
) => {
  if (authUser?.uid) {
    setLoading(true);
    try {
      const data = await getCollection(authUser, "invoices");
      if (data?.invoices) {
        setInvoicesData(data?.invoices);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user invoices:", error);
    }
  }
};

const initialValues = {
  currentInvoice: {
    total: "0.00",
    items: [],
  },
  userInvoices: [],
  userData: null,
};

export default function useFirebaseDatabase() {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useLocalStorage(
    "invoice",
    initialValues.currentInvoice,
  );
  const [invoices, setInvoices] = useState(initialValues.userInvoices);
  const [userData, setUserData] = useLocalStorage(
    "userData",
    initialValues.userData,
  );

  useEffect(() => {
    setUserDataState(authUser, setUserData);
  }, [authUser, setUserData]);

  useEffect(() => {
    setUserInvoices(authUser, setInvoices, setLoading);
  }, [authUser, setInvoices, currentInvoice]);

  useEffect(() => {
    if (
      !currentInvoice ||
      !currentInvoice.items ||
      currentInvoice.items.length === 0
    ) {
      return;
    }

    const newTotal = getTotalPrice(currentInvoice.items);
    const newInvoice = { ...currentInvoice };

    if (newTotal !== currentInvoice.total) {
      newInvoice.total = newTotal;
      setCurrentInvoice(newInvoice);
    }
  }, [currentInvoice, setCurrentInvoice]);

  const saveInvoice = async (invoice: any) => {
    if (authUser?.uid) {
      try {
        const data = await saveInvoiceToFB(authUser, invoice);
        if (data) {
          setCurrentInvoice(initialValues.currentInvoice);
          return true;
        }
      } catch (error) {
        console.error("Error while saving invoice:", error);
      }
    }
  };

  return {
    userData,
    invoices,
    currentInvoice,
    setCurrentInvoice,
    saveInvoice,
    loading,
  };
}
