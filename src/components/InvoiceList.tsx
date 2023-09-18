import { useGlobalState } from "@/context/globalStateContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface InvoiceListProps {
  heading?: boolean;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ heading = true }) => {
  const router = useRouter();
  const { invoices, setCurrentInvoice } = useGlobalState();

  async function handleinvoiceClick(invoice: any) {
    setCurrentInvoice(invoice);
    router.push("/dashboard/invoices/edit");
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      {heading && (
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Invoices
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href="/dashboard/invoices/create"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Create Invoice
            </Link>
          </div>
        </div>
      )}
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Invoice #</th>
              <th className="py-3 px-6">Client Name</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Total</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {invoices.map((invoice: any, idx: any) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">#{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.client.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      invoice.status == "Paid"
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  $ {invoice.total}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleinvoiceClick(invoice)}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
