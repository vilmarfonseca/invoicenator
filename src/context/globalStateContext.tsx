"use client";
import useFirebaseDatabase from "@/lib/hooks/useFirebaseDatabase";
import { createContext, useContext } from "react";

type GlobalContextType = {
  loading: boolean;
  currentInvoice: InvoiceType;
  setCurrentInvoice: Function;
  saveInvoice: Function;
  invoices: Array<InvoiceType>;
};

export const GlobalContext = createContext<GlobalContextType>({
  loading: true,
  currentInvoice: {
    client: {
      name: "",
      id: 0,
    },
    status: "",
    dueDate: "",
    items: [],
    total: "",
    id: 0,
  },
  setCurrentInvoice: () => {},
  saveInvoice: () => {},
  invoices: [],
});

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useFirebaseDatabase();
  return (
    <GlobalContext.Provider value={state as any}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalState = () => useContext(GlobalContext);
