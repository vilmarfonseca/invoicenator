const InvoiceList = () => {
  const tableItems = [
    {
      invoiceNumber: '1',
      clientName: 'Vilmar Fonseca',
      status: 'Paid',
      amount: '200.00',
    },
    {
      invoiceNumber: '2',
      clientName: 'Vilmar Fonseca Turbo',
      status: 'Unpaid',
      amount: '300.00',
    },
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Invoices
          </h3>
          {/* <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}
        </div>
        <div className="mt-3 md:mt-0">
          <a
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Create Invoice
          </a>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Invoice #</th>
              <th className="py-3 px-6">Client Name</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Total Amount</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  #{item.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.status == 'Paid'
                        ? 'text-green-600 bg-green-100'
                        : 'text-red-600 bg-red-100'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <a
                    href="javascript:void()"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </a>
                  <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoiceList
